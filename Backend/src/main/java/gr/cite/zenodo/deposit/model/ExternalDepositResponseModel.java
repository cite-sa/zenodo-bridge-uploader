package gr.cite.zenodo.deposit.model;

import java.util.UUID;


public class ExternalDepositResponseModel {

    private UUID id;

    private Boolean success;

    private String redirectUrl;

    public ExternalDepositResponseModel(UUID id, Boolean success, String redirectUrl) {
        this.id = id;
        this.success = success;
        this.redirectUrl = redirectUrl;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getRedirectUrl() {
        return redirectUrl;
    }

    public void setRedirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }
}
