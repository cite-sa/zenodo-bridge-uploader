package gr.cite.zenodo.deposit.entity;

import gr.cite.zenodo.converter.EntityEncryptionAttributeConverter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Table(name = "deposit_webdav_files")
@Entity
public class WebDavUrlEntity {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;
    @Column(name = "url")
    private String url;
    @Convert(converter = EntityEncryptionAttributeConverter.class)
    @Column(name = "username")
    private String username;
    @Convert(converter = EntityEncryptionAttributeConverter.class)
    @Column(name = "password")
    private String password;
    @Column(name = "is_optional")
    private Boolean isOptional;
    @Column(name = "deposit_id")
    private UUID depositEntityId;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
//    @ManyToOne
//    @JoinColumn(name="deposit_id")
//    private DepositEntity depositEntity;

//    public DepositEntity getWebDavUrl() {
//        return depositEntity;
//    }
//
//    public void setWebDavUrl(DepositEntity depositEntity) {
//        this.depositEntity = depositEntity;
//    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

//    public DepositEntity getDepositEntity() {
//        return depositEntity;
//    }
//
//    public void setDepositEntity(DepositEntity depositEntity) {
//        this.depositEntity = depositEntity;
//    }

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

    public Boolean getOptional() {
        return isOptional;
    }

    public void setOptional(Boolean optional) {
        isOptional = optional;
    }

    public UUID getDepositEntityId() {
        return depositEntityId;
    }

    public void setDepositEntityId(UUID depositEntityId) {
        this.depositEntityId = depositEntityId;
    }
}
