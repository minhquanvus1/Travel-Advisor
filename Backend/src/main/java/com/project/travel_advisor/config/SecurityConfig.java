package com.project.travel_advisor.config;

import com.project.travel_advisor.exception.JwtAuthenticationEntryPoint;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {

        http
                .authorizeHttpRequests(requests ->
                        requests
                                .requestMatchers("/secure/**").authenticated()
                                .anyRequest().permitAll())
                .oauth2ResourceServer(oauth2ResourceServer -> oauth2ResourceServer
                        .jwt(Customizer.withDefaults())
                        .authenticationEntryPoint(new JwtAuthenticationEntryPoint()));


        //add content negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class, new
                HeaderContentNegotiationStrategy());

        //force a non-empty response body for 401's to make the response more friendly
//        Okta.configureResourceServer401ResponseBody(http);

        //add CORS filters
        http.cors(Customizer.withDefaults());

        // disable CSRF since we are not using Cookies for session tracking
        http.csrf(AbstractHttpConfigurer::disable);

        return http.build();
    }
}