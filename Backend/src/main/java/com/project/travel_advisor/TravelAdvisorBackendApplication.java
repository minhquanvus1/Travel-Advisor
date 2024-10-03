package com.project.travel_advisor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class TravelAdvisorBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TravelAdvisorBackendApplication.class, args);
	}

}
