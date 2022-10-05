package gr.cite.zenodo.zenodo.security;

import gr.cite.zenodo.exception.SecurityException;
import gr.cite.zenodo.zenodo.configuration.PropertiesConfiguration;
import gr.cite.zenodo.zenodo.model.principal.PrincipalModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Map;

@Component
public class ZenodoProviderImpl implements ZenodoProvider {
    private static final Logger logger = LoggerFactory.getLogger(ZenodoProviderImpl.class);
    private final PropertiesConfiguration propertiesConfiguration;

    @Autowired
    public ZenodoProviderImpl(PropertiesConfiguration propertiesConfiguration) {
        this.propertiesConfiguration = propertiesConfiguration;
    }

    @Override
    public PrincipalModel getAccessToken(AccessType accessType, String code, String clientId, String clientSecret, String redirectUri) {
        logger.info("Getting Access Token");
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("client_id", clientId);
        map.add("client_secret", clientSecret);
        map.add("grant_type", accessType.getGrantType());
        map.add(accessType.getProperty(), code);
        map.add("redirect_uri", redirectUri);
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        Map<String, Object> values;
        try {
            values = restTemplate.postForObject(this.propertiesConfiguration.getZenodoLoginAccessTokenURL(), request, Map.class);
            PrincipalModel principal = new PrincipalModel();
            Map<String, Object> user = (Map<String, Object>) values.get("user");
            principal.setUserId((String) user.get("id"));
            principal.setEmail((String) user.get("email"));
            Integer seconds = (Integer) values.get("expires_in");
            principal.setExpiresAt(Timestamp.valueOf(LocalDateTime.now().plusSeconds(seconds.longValue())));
            principal.setAccessToken((String) values.get("access_token"));
            principal.setRefreshToken((String) values.get("refresh_token"));
            logger.info("The Access Token is:" + values.get("access_token") + " and expires At:" +principal.getExpiresAt());
            logger.info("The Refresh Token is:" + values.get("refresh_token") );
            return principal;
        } catch (HttpClientErrorException ex) {
            logger.error(ex.getResponseBodyAsString(), ex);
            throw new SecurityException();
        }
    }

    @Override
    public PrincipalModel refreshAccessToken( String clientId, String clientSecret,String refreshCode) {
        logger.info("Getting Refresh Token");
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("client_id", clientId);
        map.add("client_secret", clientSecret);
        map.add("grant_type",AccessType.REFRESH_TOKEN.getGrantType());
        map.add(AccessType.REFRESH_TOKEN.getProperty(), refreshCode);
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        Map<String, Object> values;
        try {
            values = restTemplate.postForObject(this.propertiesConfiguration.getZenodoLoginAccessTokenURL(), request, Map.class);
            PrincipalModel principal = new PrincipalModel();
            Map<String, Object> user = (Map<String, Object>) values.get("user");
            principal.setUserId((String) user.get("id"));
            principal.setEmail((String) user.get("email"));
            Integer seconds = (Integer) values.get("expires_in");
            principal.setExpiresAt(Timestamp.valueOf(LocalDateTime.now().plusSeconds(seconds.longValue())));
            principal.setAccessToken((String) values.get("access_token"));
            principal.setRefreshToken((String) values.get("refresh_token"));
            logger.info("The Access Token is:" + values.get("access_token") + " and expires At:" +principal.getExpiresAt());
            logger.info("The Refresh Token is:" + values.get("refresh_token") );
            return principal;
        } catch (HttpClientErrorException ex) {
            logger.error(ex.getLocalizedMessage(), ex);
            throw new SecurityException();
        }
    }

}
