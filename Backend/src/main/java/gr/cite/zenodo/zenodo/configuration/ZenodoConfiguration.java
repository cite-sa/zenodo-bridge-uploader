package gr.cite.zenodo.zenodo.configuration;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(PropertiesConfiguration.class)
public class ZenodoConfiguration {
}

