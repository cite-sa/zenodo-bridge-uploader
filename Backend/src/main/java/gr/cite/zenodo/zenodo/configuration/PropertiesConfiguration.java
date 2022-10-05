package gr.cite.zenodo.zenodo.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties(prefix = "zenodo")
@ConstructorBinding
public class PropertiesConfiguration {
    private String zenodoUrl;
    private String zenodoLoginAccessTokenURL;
    private String zenodoLoginClientId;
    private String zenodoLoginClientSecret;
    private String zenodoLoginRedirectUrl;

    public PropertiesConfiguration() {
        this.zenodoUrl = zenodoUrl;
    }

    public String getZenodoUrl() {
        return zenodoUrl;
    }

    public void setZenodoUrl(String zenodoUrl) {
        this.zenodoUrl = zenodoUrl;
    }

    public String getZenodoLoginAccessTokenURL() {
        return zenodoLoginAccessTokenURL;
    }

    public void setZenodoLoginAccessTokenURL(String zenodoLoginAccessTokenURL) {
        this.zenodoLoginAccessTokenURL = zenodoLoginAccessTokenURL;
    }

    public String getZenodoLoginClientId() {
        return zenodoLoginClientId;
    }

    public void setZenodoLoginClientId(String zenodoLoginClientId) {
        this.zenodoLoginClientId = zenodoLoginClientId;
    }

    public String getZenodoLoginClientSecret() {
        return zenodoLoginClientSecret;
    }

    public void setZenodoLoginClientSecret(String zenodoLoginClientSecret) {
        this.zenodoLoginClientSecret = zenodoLoginClientSecret;
    }

    public String getZenodoLoginRedirectUrl() {
        return zenodoLoginRedirectUrl;
    }

    public void setZenodoLoginRedirectUrl(String zenodoLoginRedirectUrl) {
        this.zenodoLoginRedirectUrl = zenodoLoginRedirectUrl;
    }
}