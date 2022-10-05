package gr.cite.zenodo.deposit.entity;

import gr.cite.zenodo.converter.EntityEncryptionAttributeConverter;
import gr.cite.zenodo.zenodo.enumeration.ZenodoStatus;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Table(name = "deposit")
@Entity
public class DepositEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;
    @Column(name = "status", nullable = false)
    private ZenodoStatus status;
    @Column(name = "deposit_metadata")
    private String depositMetadata;
    @Convert(converter = EntityEncryptionAttributeConverter.class)
    @Column(name = "access_token")
    private String access_token;
    @Convert(converter = EntityEncryptionAttributeConverter.class)
    @Column(name = "refresh_token")
    private String refresh_token;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @Column(name = "doi")
    private String doi;
    @Column(name = "files")
    private String files;
    @Column(name = "file_urls")
    private String fileUrls;
    @Column(name = "created_at")
    private Instant createdAt;
    @OneToMany(mappedBy = "depositEntityId")
    private List<WebDavUrlEntity> webDavUrl;
    @Column(name = "read_only_fields")
    private String readOnlyFields;
    @Column(name = "hidden_fields")
    private String hiddenFields;

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

    public String getDepositMetadata() {
        return depositMetadata;
    }

    public void setDepositMetadata(String depositMetadata) {
        this.depositMetadata = depositMetadata;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getFiles() {
        return files;
    }

    public void setFiles(String files) {
        this.files = files;
    }

    public String getFileUrls() {
        return fileUrls;
    }

    public void setFileUrls(String fileUrls) {
        this.fileUrls = fileUrls;
    }

    public List<WebDavUrlEntity> getWebDavUrl() {
        return webDavUrl;
    }

    public void setWebDavUrl(List<WebDavUrlEntity> webDavUrl) {
        this.webDavUrl = webDavUrl;
    }

    public String getRefreshToken() {
        return refresh_token;
    }

    public void setRefreshToken(String refreshToken) {
        this.refresh_token = refreshToken;
    }

    public String getReadOnlyFields() {
        return readOnlyFields;
    }

    public void setReadOnlyFields(String readOnlyFields) {
        this.readOnlyFields = readOnlyFields;
    }

    public String getHiddenFields() {
        return hiddenFields;
    }

    public void setHiddenFields(String hiddenFields) {
        this.hiddenFields = hiddenFields;
    }
}
