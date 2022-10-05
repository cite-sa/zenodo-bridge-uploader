package gr.cite.zenodo.deposit.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import gr.cite.zenodo.deposit.model.metadata.Metadata;
import gr.cite.zenodo.storage.model.StorageFile;
import gr.cite.zenodo.zenodo.enumeration.ZenodoStatus;

import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.List;
import java.util.UUID;


public class DepositModel {

    @NotNull
    private UUID id;

    private ZenodoStatus status;
    @JsonProperty("deposit_metadata")
    private Metadata depositMetadata;

    private String access_token;

    private String refresh_token;

    private String title;

    private String description;

    private String doi;

    private List<StorageFile> files;

    private List<String> fileUrls;

    @JsonProperty("web_dav_urls")
    private List<WebDavUrlModel> webDavUrl;

    private Instant createdAt;

    private String[] readOnlyFields;

    private String[] hiddenFields;

    public String getDoi() {
        return doi;
    }

    public void setDoi(String doi) {
        this.doi = doi;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAccessToken() {
        return access_token;
    }

    public void setAccessToken(String accessToken) {
        this.access_token = accessToken;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public ZenodoStatus getStatus() {
        return status;
    }

    public void setStatus(ZenodoStatus status) {
        this.status = status;
    }

    public Metadata getDepositMetadata() {
        return depositMetadata;
    }

    public void setDepositMetadata(Metadata depositMetadata) {
        this.depositMetadata = depositMetadata;
    }

    public List<StorageFile> getFiles() {
        return files;
    }

    public void setFiles(List<StorageFile> files) {
        this.files = files;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public List<String> getFileUrls() {
        return fileUrls;
    }

    public void setFileUrls(List<String> fileUrls) {
        this.fileUrls = fileUrls;
    }

    public List<WebDavUrlModel> getWebDavUrl() {
        return webDavUrl;
    }

    public void setWebDavUrl(List<WebDavUrlModel> webDavUrl) {
        this.webDavUrl = webDavUrl;
    }

    public String getRefreshToken() {
        return refresh_token;
    }

    public void setRefreshToken(String refreshToken) {
        this.refresh_token = refreshToken;
    }

    public String[] getReadOnlyFields() {
        return readOnlyFields;
    }

    public void setReadOnlyFields(String[] readOnlyFields) {
        this.readOnlyFields = readOnlyFields;
    }

    public String[] getHiddenFields() {
        return hiddenFields;
    }

    public void setHiddenFields(String[] hiddenFields) {
        this.hiddenFields = hiddenFields;
    }
}
