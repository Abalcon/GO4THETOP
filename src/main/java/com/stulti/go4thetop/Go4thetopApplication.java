package com.stulti.go4thetop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

// Tell Spring to turn on WebMVC (e.g., it should enable the DispatcherServlet
// so that requests can be routed to our Controllers)
@EnableWebMvc
// Tell Spring that this object represents a Configuration for the
// application
@Configuration
@SpringBootApplication/*(exclude={DataSourceAutoConfiguration.class})*/
public class Go4thetopApplication {

    public static void main(String[] args) {
        SpringApplication.run(Go4thetopApplication.class, args);
    }

}
