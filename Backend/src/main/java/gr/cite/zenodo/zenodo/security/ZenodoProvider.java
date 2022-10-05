package gr.cite.zenodo.zenodo.security;

import gr.cite.zenodo.zenodo.model.principal.PrincipalModel;

interface ZenodoProvider {
    PrincipalModel getAccessToken(AccessType accessType, String code, String clientId, String clientSecret, String redirectUri);
    PrincipalModel refreshAccessToken( String clientId, String clientSecret,String refreshCode);
}