package gr.cite.zenodo.deposit.converter.metadata;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import gr.cite.zenodo.converter.AutoRegisteredConverter;
import gr.cite.zenodo.deposit.model.metadata.Metadata;
import org.springframework.stereotype.Component;

@Component
public  class StringToMetadataConverter extends AutoRegisteredConverter<String,Metadata> {

    private final  ObjectMapper objectMapper;

    public StringToMetadataConverter() {
        objectMapper = new ObjectMapper();
    }

    @Override
    public Metadata convert(String metadataStr) {
        Metadata metadata = null;
        try {
            metadata = objectMapper.readValue(metadataStr,Metadata.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return metadata;
    }
}

