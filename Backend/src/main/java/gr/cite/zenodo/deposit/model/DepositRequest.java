package gr.cite.zenodo.deposit.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import gr.cite.zenodo.deposit.model.metadata.Metadata;
import gr.cite.zenodo.storage.model.StorageFile;

import java.io.Serializable;
import java.util.List;

@JsonAutoDetect(
        fieldVisibility = JsonAutoDetect.Visibility.ANY,
        getterVisibility = JsonAutoDetect.Visibility.NONE,
        setterVisibility = JsonAutoDetect.Visibility.NONE)
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
//@JsonPropertyOrder({ "title", "description", "doi", "state", "record_id", "owner", "record_url","file_type","deposit_metadata"})
public class DepositRequest implements Serializable {

    @JsonProperty("deposit_metadata")
    private Metadata DepositMetadata;
    @JsonProperty("files")
    private List<StorageFile> files;
    @JsonProperty("file_urls")
    private List<String> fileUrls;
    @JsonProperty("web_dav_urls")
    private List<WebDavUrlModel> webDavUrlModels;
    @JsonProperty("read_only_fields")
    private List<String> readOnlyFields;
    @JsonProperty("hidden_fields")
    private List<String> hiddenFields;


    public Metadata getDepositMetadata() {
        return DepositMetadata;
    }

    public void setDepositMetadata(Metadata depositMetadata) {
        DepositMetadata = depositMetadata;
    }

    public List<StorageFile> getFiles() {
        return files;
    }

    public void setFiles(List<StorageFile> files) {
        this.files = files;
    }

    public List<String> getFileUrls() {
        return fileUrls;
    }

    public void setFileUrls(List<String> fileUrls) {
        this.fileUrls = fileUrls;
    }

    public List<WebDavUrlModel> getWebDavUrlModels() {
        return webDavUrlModels;
    }

    public void setWebDavUrlModels(List<WebDavUrlModel> webDavUrlModels) {
        this.webDavUrlModels = webDavUrlModels;
    }

    public List<String> getReadOnlyFields() {
        return readOnlyFields;
    }

    public void setReadOnlyFields(List<String> readOnlyFields) {
        this.readOnlyFields = readOnlyFields;
    }

    public List<String> getHiddenFields() {
        return hiddenFields;
    }

    public void setHiddenFields(List<String> hiddenFields) {
        this.hiddenFields = hiddenFields;
    }
}


