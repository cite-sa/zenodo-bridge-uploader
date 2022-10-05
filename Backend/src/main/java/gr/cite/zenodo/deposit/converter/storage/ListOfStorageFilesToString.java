package gr.cite.zenodo.deposit.converter.storage;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import gr.cite.zenodo.converter.AutoRegisteredConverter;
import gr.cite.zenodo.storage.model.StorageFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ListOfStorageFilesToString extends AutoRegisteredConverter<List<StorageFile>, String> {

    private final ObjectMapper objectMapper;

    @Autowired
    public ListOfStorageFilesToString(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public String convert(List<StorageFile> storageFiles) {
        String storageFileStr = null;
        try {
            storageFileStr = objectMapper.writeValueAsString(storageFiles);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return storageFileStr;
    }
}
