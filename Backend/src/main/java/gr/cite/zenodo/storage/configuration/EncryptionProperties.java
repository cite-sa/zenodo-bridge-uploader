package gr.cite.zenodo.storage.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties(prefix = "encryption")
@ConstructorBinding
public class EncryptionProperties {
    private final String dbKey;

    public EncryptionProperties(String dbKey) {
        this.dbKey = dbKey;
    }

    public String getDbKey() {
        return dbKey;
    }
}
