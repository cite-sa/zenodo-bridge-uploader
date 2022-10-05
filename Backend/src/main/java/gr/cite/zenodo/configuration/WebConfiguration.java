package gr.cite.zenodo.configuration;

import gr.cite.zenodo.zenodo.configuration.PropertiesConfiguration;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    private final PropertiesConfiguration propertiesConfiguration;

    @Autowired
    public WebConfiguration(PropertiesConfiguration propertiesConfiguration) {
        this.propertiesConfiguration = propertiesConfiguration;
    }
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean(name="basicWebClient")
    public WebClient getBasicWebClient() {
        return WebClient.builder().baseUrl(propertiesConfiguration.getZenodoUrl())
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }
    @Bean(name="webDavWebClient")
    public WebClient getWebDavWebClient() {
        return WebClient.builder().build();
    }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry  registry) {
                registry.addMapping("/**");
            }
        };
    }
}
