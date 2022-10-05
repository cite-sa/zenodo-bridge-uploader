package gr.cite.zenodo.deposit.converter.storage;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import gr.cite.zenodo.converter.AutoRegisteredConverter;
import gr.cite.zenodo.zenodo.model.principal.PrincipalModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StringToPrincipalModel extends AutoRegisteredConverter<String, PrincipalModel> {

    private final ObjectMapper objectMapper;

    @Autowired
    public StringToPrincipalModel(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public PrincipalModel convert(String principalModelStr) {
        PrincipalModel principalModel = null;
        try {
            principalModel = objectMapper.readValue(principalModelStr, PrincipalModel.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return principalModel;
    }
}
