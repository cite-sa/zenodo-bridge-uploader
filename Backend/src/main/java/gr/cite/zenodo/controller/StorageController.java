package gr.cite.zenodo.controller;


import gr.cite.zenodo.responses.ResponseMessage;
import gr.cite.zenodo.storage.model.StorageFile;
import gr.cite.zenodo.storage.service.StorageFileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/storage/files")
public class StorageController {
    private final Logger logger = LoggerFactory.getLogger(StorageController.class);
    private final StorageFileService storageFileService;

    public StorageController(StorageFileService storageFileService) {
        this.storageFileService = storageFileService;
    }

    @RequestMapping(path = "", method = RequestMethod.POST)
    public ResponseEntity<ResponseMessage<List<StorageFile>>> storeFiles(@RequestPart(name = "file", required = true) List<MultipartFile> files) {
        logger.info("storing files");
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage<List<StorageFile>>().status(HttpStatus.OK.value()).body(readMultipartFiles(files)));
    }

    @PostMapping(value = "/metadata", consumes = {"multipart/form-data"})
    public ResponseEntity getMetadataFromFile(@RequestPart(name = "file", required = true) MultipartFile files) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(this.storageFileService.convertMultiPartToFile(files));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    private List<StorageFile> readMultipartFiles(List<MultipartFile> files) {
        List<StorageFile> storageFiles = new ArrayList<>();
        if (files != null) {
            for (MultipartFile file : files) {
                try {
                    if (file != null && !file.isEmpty()) {
                        InputStream data = file.getInputStream();
                        storageFiles.add(storageFileService.storeFile(file.getOriginalFilename(), data, file.getContentType()));
                    }
                } catch (IOException e) {
                    logger.error("Could not parse data of file " + file.getOriginalFilename(), e);
                }
            }
        }
        if (files == null || files.isEmpty())
            throw new RuntimeException("Failed to store file");

        return storageFiles;
    }
}
