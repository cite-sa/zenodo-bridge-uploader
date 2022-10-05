package gr.cite.zenodo.deposit.converter.storage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import gr.cite.zenodo.converter.AutoRegisteredConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class ListOfFileUrlsToString extends AutoRegisteredConverter<List<String>,String> {

    private final ObjectMapper objectMapper;
    @Autowired
    public ListOfFileUrlsToString(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public String convert(List<String> fileUrls) {
        String urls = null;
        try {
            urls = objectMapper.writeValueAsString(fileUrls);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return urls;
    }

}
