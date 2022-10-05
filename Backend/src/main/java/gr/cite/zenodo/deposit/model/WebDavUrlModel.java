package gr.cite.zenodo.deposit.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

@NotNull
public class WebDavUrlModel {
    private String url;
    private Boolean requiresAuthentication;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Boolean getRequiresAuthentication() {
        return requiresAuthentication;
    }

    public void setRequiresAuthentication(Boolean requiresAuthentication) {
        this.requiresAuthentication = requiresAuthentication;
    }
}
