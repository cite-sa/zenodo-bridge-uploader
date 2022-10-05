package gr.cite.zenodo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = { "gr.cite.zenodo"})
public class ZenodoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZenodoApplication.class, args);
	}

}
