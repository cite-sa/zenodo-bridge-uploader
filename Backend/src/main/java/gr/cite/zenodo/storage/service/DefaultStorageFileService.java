package gr.cite.zenodo.storage.service;

import gr.cite.zenodo.deposit.model.WebDavUrlModel;
import gr.cite.zenodo.storage.configuration.StorageProperties;
import gr.cite.zenodo.storage.configuration.WebDavConfiguration;
import gr.cite.zenodo.storage.model.StorageFile;
import org.apache.tomcat.util.codec.binary.Base64;
import org.apache.tomcat.util.codec.binary.StringUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import javax.activation.MimetypesFileTypeMap;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.ByteBuffer;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.UUID;

@Service
public class DefaultStorageFileService implements StorageFileService {
    private static final int DEFAULT_BUFFER_SIZE = 8192;
    private final StorageProperties storageProperties;
    private final WebDavConfiguration webDavLocationConf;
    private final WebClient basicWebClient;
    private final WebClient webDavWebClient;
    private final static Logger logger = LoggerFactory.getLogger(DefaultStorageFileService.class);

    @Autowired
    public DefaultStorageFileService(StorageProperties storageProperties, WebDavConfiguration webDavLocationConf, @Qualifier("basicWebClient") WebClient basicWebClient, @Qualifier("webDavWebClient") WebClient webDavWebClient) {
        this.storageProperties = storageProperties;
        this.webDavLocationConf = webDavLocationConf;
        this.basicWebClient = basicWebClient;
        this.webDavWebClient = webDavWebClient;
    }

    @Override
    public StorageFile storeFile(String fileName, InputStream data, String contentType) throws IOException {
        String fileRef = writeFileLocal(fileName, data, contentType);
        StorageFile storageFile = new StorageFile();
        storageFile.setFileRef(fileRef);
        storageFile.setName(fileName);
        storageFile.setMimeType(contentType);
        return storageFile;
    }

    @Override
    public StorageFile storeFile(String fileName, String fileRef, String contentType) throws IOException {
        StorageFile storageFile = new StorageFile();
        storageFile.setFileRef(fileRef);
        storageFile.setName(fileName);
        storageFile.setMimeType(contentType);
        return storageFile;
    }

    @Override
    public File getSingle(String id) {
        return new File(storageProperties.getStorePath() + "/" + id);
    }

    @Override
    public StorageFile downloadFile(String url, String username, String password) throws IOException {

        String fileRef = UUID.randomUUID().toString();
        Files.createDirectories(Paths.get(storageProperties.getStorePath()+"/"));
        DownloadedFile downloadedFile = this.downloadFile(url, storageProperties.getStorePath() + "/" + fileRef, username, password);
        if(downloadedFile == null) throw new IOException ("Could not download file");
        MimetypesFileTypeMap fileTypeMap = new MimetypesFileTypeMap();
        String mimeType = fileTypeMap.getContentType(downloadedFile.getFilename());
        return storeFile(downloadedFile.getFilename(), fileRef, mimeType);
    }

    @Override
    public StorageFile downloadFileFromWebDav(WebDavUrlModel webDav) throws Exception {
        String filename = webDav.getUrl().substring(webDav.getUrl().lastIndexOf("/") + 1);
        if (webDav.getRequiresAuthentication() == null || webDav.getRequiresAuthentication()) {
            WebDavConfiguration.WebDavLocation webDavLocation = webDavLocationConf.getLocations().stream().filter(x -> webDav.getUrl().startsWith(x.getUrl())).findFirst().orElse(null);
            if (webDavLocation == null) throw new Exception("Could not locate webDav conf for " + webDav.getUrl());

           return this.downloadFile(webDav.getUrl(), webDavLocation.getUsername(), webDavLocation.getPassword());
        }  else {
            return this.downloadFile(webDav.getUrl(), null,  null);
        }
    }

    @Override
    public String convertMultiPartToFile(MultipartFile file) throws IOException {
        Files.createDirectories(Paths.get(storageProperties.getStorePath()+"/"));
        File convFile = new File(storageProperties.getStorePath() + "/" + Objects.requireNonNull(file.getOriginalFilename()));
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        JSONObject metadataObj;
        try {
            Object object = new JSONParser().parse(new FileReader(storageProperties.getStorePath() + "/" + convFile.getName()));
            metadataObj = (JSONObject) object;
        } catch (ParseException e) {
            throw new IOException();
        }
        return Objects.requireNonNull(metadataObj).toString();
    }

    private DownloadedFile downloadFile(String urlString, String outputPath, String username, String password) {
        try {
            URL url = new URL(urlString);
            // open the connection
            URLConnection con = null;

            con = url.openConnection();

            if(username != null && password != null) {
                String auth = username + ":" + password;
                byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(StandardCharsets.UTF_8));
                String authHeaderValue = "Basic " + new String(encodedAuth);
                con.setRequestProperty("Authorization", authHeaderValue);
            }
            // get and verify the header field
            String fieldValue = con.getHeaderField("Content-Disposition");
            if (fieldValue == null || !fieldValue.contains("filename=\"")) {
                // no file name there -> throw exception ...
            }
            // parse the file name from the header field
            String filename = fieldValue.substring(fieldValue.indexOf("filename=\"") + 10, fieldValue.length() - 1);

            // create file in systems temporary directory
            File download = new File(outputPath);

            // open the stream and download
            ReadableByteChannel rbc = Channels.newChannel(con.getInputStream());
            FileOutputStream fos = new FileOutputStream(download);
            try {
                fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);
            } catch (IOException e) {
                e.printStackTrace();
                throw e;
            } finally {
                fos.close();
            }
            return new DownloadedFile(filename, download);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private String writeFileLocal(String fileName, InputStream data, String contentType) throws IOException {
        String fileRef = UUID.randomUUID().toString();
        Files.createDirectories(Paths.get(storageProperties.getStorePath() + "/"));
        FileOutputStream fileOutputStream = new FileOutputStream(storageProperties.getStorePath() + "/" + fileRef);
        //GK: Step one get UTF-8 byte arrays of file name and content type
        byte[] fileNameBuff = fileName.getBytes(StandardCharsets.UTF_8);
        byte[] mimeBuff = contentType.getBytes(StandardCharsets.UTF_8);
        //GK: Step two Create header buffer
        byte[] buff = ByteBuffer.allocate(8 + fileNameBuff.length + mimeBuff.length) //GK: Allocation goes as follows, 4 bites for File name length, file name, 4 bytes for Content Type length and content type
                .putInt(fileNameBuff.length)
                .put(fileNameBuff)
                .putInt(mimeBuff.length)
                .put(mimeBuff)
                .array();
        fileOutputStream.write(buff, 0, 8 + fileNameBuff.length + mimeBuff.length);
        data.transferTo(fileOutputStream);
        fileOutputStream.flush();
        fileOutputStream.close();
        return fileRef;
    }
}
