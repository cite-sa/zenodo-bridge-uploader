package gr.cite.zenodo.zenodo.security;

import gr.cite.zenodo.zenodo.configuration.PropertiesConfiguration;
import gr.cite.zenodo.zenodo.model.ZenodoRequestToken;
import gr.cite.zenodo.zenodo.model.principal.PrincipalModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ZenodoTokenValidator {
    private final PropertiesConfiguration propertiesConfiguration;
    private final ZenodoProvider zenodoProvider;

    @Autowired
    public ZenodoTokenValidator(PropertiesConfiguration propertiesConfiguration, ZenodoProvider zenodoProvider) {
        this.propertiesConfiguration = propertiesConfiguration;
        this.zenodoProvider = zenodoProvider;
    }

    public PrincipalModel getAccessToken(ZenodoRequestToken zenodoRequest) {
        return this.zenodoProvider.getAccessToken(AccessType.AUTHORIZATION_CODE, zenodoRequest.getCode()
                , this.propertiesConfiguration.getZenodoLoginClientId()
                , this.propertiesConfiguration.getZenodoLoginClientSecret()
                , this.propertiesConfiguration.getZenodoLoginRedirectUrl());
    }
    public PrincipalModel refreshAccessToken(String refreshCode) {
        return this.zenodoProvider.refreshAccessToken(
                this.propertiesConfiguration.getZenodoLoginClientId(),
                this.propertiesConfiguration.getZenodoLoginClientSecret(),refreshCode);
    }
}
