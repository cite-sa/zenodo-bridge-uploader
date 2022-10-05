package gr.cite.zenodo.deposit.converter.storage;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import gr.cite.zenodo.converter.AutoRegisteredConverter;
import gr.cite.zenodo.storage.model.StorageFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StringToListOfStorageFile extends AutoRegisteredConverter<String, List<StorageFile>> {

    private final ObjectMapper objectMapper;
    @Autowired
    public StringToListOfStorageFile(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;

    }
    @Override
    public List<StorageFile> convert(String filesStr) {
        List<StorageFile> storageFile = null;
        try {
            storageFile = objectMapper.readValue(filesStr,new TypeReference<>(){});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return storageFile;
    }
}
