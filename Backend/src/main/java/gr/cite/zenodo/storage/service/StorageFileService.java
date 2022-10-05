package gr.cite.zenodo.storage.service;

import gr.cite.zenodo.deposit.model.WebDavUrlModel;
import gr.cite.zenodo.storage.model.StorageFile;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

public interface StorageFileService {
    StorageFile storeFile(String fileName, InputStream data, String contentType) throws IOException;
    StorageFile storeFile(String fileName, String fileRef, String contentType) throws IOException;
    File getSingle(String id) throws IOException;
    StorageFile downloadFile(String url, String username, String password) throws IOException;
    StorageFile downloadFileFromWebDav(WebDavUrlModel webDav) throws IOException, Exception;
    String convertMultiPartToFile(MultipartFile file) throws IOException;
}


