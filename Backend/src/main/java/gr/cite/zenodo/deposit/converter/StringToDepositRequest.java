package gr.cite.zenodo.deposit.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import gr.cite.zenodo.converter.AutoRegisteredConverter;
import gr.cite.zenodo.deposit.model.DepositRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StringToDepositRequest extends AutoRegisteredConverter<String, DepositRequest> {

    private final ObjectMapper objectMapper;

    @Autowired
    public StringToDepositRequest(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public DepositRequest convert( String depositRequestStr) {
        DepositRequest depositRequest = null;
        try {
            depositRequest = objectMapper.readValue(depositRequestStr,DepositRequest.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return depositRequest;
    }
}
