package gr.cite.zenodo.deposit.converter.storage;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import gr.cite.zenodo.converter.AutoRegisteredConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class StringToListOfFileUrls extends AutoRegisteredConverter<String, List<String>> {
    private final ObjectMapper objectMapper;
    @Autowired
    public StringToListOfFileUrls(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;

    }
    @Override
    public List<String> convert(String fileUrlsStr) {
        List<String> urls = null;
        try {
            urls = objectMapper.readValue(fileUrlsStr,new TypeReference<>(){});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return urls;
    }
}