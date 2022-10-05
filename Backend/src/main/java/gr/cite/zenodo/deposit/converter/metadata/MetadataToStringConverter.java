package gr.cite.zenodo.deposit.converter.metadata;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import gr.cite.zenodo.converter.AutoRegisteredConverter;
import gr.cite.zenodo.deposit.model.metadata.Metadata;
import org.springframework.stereotype.Component;

@Component
public  class MetadataToStringConverter extends AutoRegisteredConverter<Metadata, String> {

    private final  ObjectMapper objectMapper;

    public MetadataToStringConverter() {
        objectMapper = new ObjectMapper();
    }

    @Override
    public String convert(Metadata metadata) {
        String metadataStr = null;
        try {
            metadataStr = objectMapper.writeValueAsString(metadata);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return metadataStr;
    }
}

