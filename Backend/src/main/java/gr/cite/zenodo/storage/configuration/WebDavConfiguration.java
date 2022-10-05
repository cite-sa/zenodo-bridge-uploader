package gr.cite.zenodo.storage.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Configuration
@ConfigurationProperties(prefix = "webdavlocations")
public class WebDavConfiguration {

    private List<WebDavLocation> locations;

    public WebDavConfiguration(List<WebDavLocation> locations) {
        this.locations = locations;
    }

    public List<WebDavLocation> getLocations() {
        return locations;
    }

    public void setLocations(List<WebDavLocation> locations) {
        this.locations = locations;
    }

    public static class WebDavLocation {
        private String name;
        private String url;
        private String username;
        private String password;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

}
