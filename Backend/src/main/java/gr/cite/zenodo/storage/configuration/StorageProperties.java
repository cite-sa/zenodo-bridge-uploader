package gr.cite.zenodo.storage.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties(prefix = "storage")
@ConstructorBinding
public class StorageProperties {
    private final String storePath;

    public StorageProperties(String storePath) {
        this.storePath = storePath;

    }
    public String getStorePath() {
        return storePath;
    }
}
