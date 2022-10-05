package gr.cite.zenodo.zenodo.service;

import gr.cite.zenodo.deposit.model.DepositModel;
import gr.cite.zenodo.deposit.model.metadata.Metadata;
import gr.cite.zenodo.deposit.model.metadata.ZenodoDeposit;
import gr.cite.zenodo.storage.model.StorageFile;
import gr.cite.zenodo.storage.service.StorageFileService;
import gr.cite.zenodo.zenodo.model.principal.PrincipalModel;
import gr.cite.zenodo.zenodo.security.ZenodoTokenValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.TypeDescriptor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import javax.activation.MimetypesFileTypeMap;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class ZenodoUploaderImpl implements ZenodoUploader {
    private final WebClient webClient;
    private final ConversionService conversionService;
    private final StorageFileService storageFileService;
    private final ZenodoTokenValidator zenodoTokenValidator;
    private final static Logger logger = LoggerFactory.getLogger(ZenodoUploaderImpl.class);

    @Autowired
    public ZenodoUploaderImpl(@Qualifier("basicWebClient") WebClient webClient, ConversionService conversionService, StorageFileService storageFileService, ZenodoTokenValidator zenodoTokenValidator) {
        this.webClient = webClient;
        this.conversionService = conversionService;
        this.storageFileService = storageFileService;
        this.zenodoTokenValidator = zenodoTokenValidator;
    }

    @Override
    public boolean uploadZenodoRequest(DepositModel depositModel) {
        List<StorageFile> files = depositModel.getFiles();

        //TypeDescriptor sourceType = TypeDescriptor.valueOf(String.class);
        //TypeDescriptor targetType = TypeDescriptor.collection(List.class, TypeDescriptor.valueOf(String.class));
        //List<String> fileUrls = (List<String>) conversionService.convert(depositModel.getFileUrls(), sourceType, targetType);

        if(depositModel.getFileUrls() != null && depositModel.getFileUrls().size() > 0) {
            mapDownloadedFilesToFilesList(files, depositModel.getFileUrls());
        }
        if(depositModel.getWebDavUrl() != null && depositModel.getWebDavUrl().size() > 0) {
            mapWebDavUrlsToFiles(depositModel, files);
        }

        LinkedHashMap<String, String> links = uploadDepositor(depositModel);
        if (links.isEmpty() || !links.containsKey("bucket")) return false;
        String bucketLink = links.get("bucket");

        if (!Objects.requireNonNull(files).isEmpty()) {
            if (!uploadFiles(files, bucketLink, depositModel)) return false;
        }

        return this.publishDeposition(links.get("publish"), depositModel);
    }

    private boolean publishDeposition(String publishLink, DepositModel depositModel) {
        boolean refreshedCode;
        try {
            this.triggerPublishDeposition(publishLink, depositModel.getAccessToken());
            return true;
        } catch (WebClientResponseException e) {
            logger.error(
                    "Sending request failed with status: " + e.getRawStatusCode() +
                            " with error message: " + e.getResponseBodyAsString());
            refreshedCode = this.ifUnauthorizedRefreshCode(e.getStatusCode(), depositModel);
        }
        if (refreshedCode) {
            this.triggerPublishDeposition(publishLink, depositModel.getAccessToken());
        }
        return false;
    }

    private void triggerPublishDeposition(String publishLink, String accessToken) {
        webClient.post()
                .uri(publishLink + "?access_token=" + accessToken)
                .retrieve()
                .bodyToMono(LinkedHashMap.class).block();
    }

    private LinkedHashMap<String, String> uploadDepositor(DepositModel depositModel) {
        boolean refreshedCode;
        try {
            return this.uploadDepositorAction(depositModel);
        } catch (WebClientResponseException e) {
            logger.error(
                    "Sending request failed with status: " + e.getRawStatusCode() +
                            " with error message: " + e.getResponseBodyAsString());
            refreshedCode = this.ifUnauthorizedRefreshCode(e.getStatusCode(), depositModel);
        }
        if (refreshedCode) {
            return this.uploadDepositorAction(depositModel);
        }

        return null;
    }

    private LinkedHashMap<String, String> uploadDepositorAction(DepositModel depositModel) {
        ZenodoDeposit zenodoDeposit = createZenodoDeposit(depositModel);

        return (LinkedHashMap<String, String>) webClient.post()
                .uri("deposit/depositions" + "?access_token=" + depositModel.getAccessToken())
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(zenodoDeposit)
                .retrieve()
                .bodyToMono(LinkedHashMap.class).block().get("links");
    }

    private boolean uploadFiles(List<StorageFile> files, String bucketLink, DepositModel depositModel) {
        AtomicBoolean success = new AtomicBoolean(false);
        AtomicBoolean isRefreshedCode = new AtomicBoolean(false);
        files.forEach(file -> {
            try {
                this.uploadFileToZenodo(file, bucketLink, depositModel.getAccessToken());
                success.set(true);
            } catch (IOException ioException) {
                logger.error(ioException.getLocalizedMessage());
                success.set(false);
            } catch (WebClientResponseException e) {
                logger.error(
                        "Sending request failed with status: " + e.getRawStatusCode() +
                                " with error message: " + e.getResponseBodyAsString());
                isRefreshedCode.set(this.ifUnauthorizedRefreshCode(e.getStatusCode(), depositModel));
                success.set(false);
            }
            if (isRefreshedCode.get()) {
                try {
                    this.uploadFileToZenodo(file, bucketLink, depositModel.getAccessToken());
                } catch (IOException ioException) {
                    logger.error(ioException.getLocalizedMessage());
                }
            }
        });
        return success.get();
    }

    private void uploadFileToZenodo(StorageFile file, String bucketLink, String accessToken) throws IOException {
        FileSystemResource fileSystemResource = new FileSystemResource(storageFileService.getSingle(file.getFileRef()));
        String addFileUrl = bucketLink + "/" + file.getName() + "?access_token=" + accessToken;
        String path = fileSystemResource.getPath();
        String filename = path.substring(path.lastIndexOf("/") + 1);
        MimetypesFileTypeMap fileTypeMap = new MimetypesFileTypeMap();
        String mediaType = fileTypeMap.getContentType(filename);
        webClient.put()
                .uri(addFileUrl)
                .contentType(MediaType.valueOf(mediaType))
                .bodyValue(fileSystemResource)
                .retrieve().bodyToMono(String.class).block();
    }

    private void mapDownloadedFilesToFilesList(List<StorageFile> files, List<String> fileUrls) {
        Objects.requireNonNull(fileUrls).forEach(file -> {
            try {
                if (!file.isEmpty() && !file.isBlank()) {
                    StorageFile storageFile = this.storageFileService.downloadFile(file, null,  null);
                    files.add(storageFile);
                }
            } catch (IOException e) {
                logger.error(e.getMessage(), e);
            }
        });
    }

    private ZenodoDeposit createZenodoDeposit(DepositModel depositModel) {
        ZenodoDeposit zenodoDeposit = new ZenodoDeposit();
        Metadata metadata = conversionService.convert(depositModel.getDepositMetadata(), Metadata.class);
        if (metadata != null)
            zenodoDeposit.setMetadata(metadata);

        zenodoDeposit.getMetadata().setTitle(depositModel.getTitle());
        zenodoDeposit.getMetadata().setDescription(depositModel.getDescription());
        return zenodoDeposit;
    }

    private boolean ifUnauthorizedRefreshCode(HttpStatus status, DepositModel depositModel) {
        if (status.value() == HttpStatus.UNAUTHORIZED.value()) {
            PrincipalModel principal = this.zenodoTokenValidator.refreshAccessToken(depositModel.getRefreshToken());
            depositModel.setAccessToken(principal.getAccessToken());
            return true;
        }
        return false;
    }

    private void mapWebDavUrlsToFiles(DepositModel depositModel, List<StorageFile> files) {
        depositModel.getWebDavUrl().forEach(webDav -> {
            try {
                StorageFile storageFile = this.storageFileService.downloadFileFromWebDav(webDav);
                files.add(storageFile);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }
}
