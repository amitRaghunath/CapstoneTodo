package com.org.apigateway.entrypoint;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EntryController {

    @Bean
    public RouteLocator myRoute(RouteLocatorBuilder builder)
    {
        return builder.routes().route(p->p.path("/userService/**")
                .uri("lb://user-service/*")).route(p->p.path("/userTodo/**")
                .uri("lb://todo-service/*")).route(p->p.path("/archiveService/**")
                .uri("lb://archive-service/*")).build();
    }
}
