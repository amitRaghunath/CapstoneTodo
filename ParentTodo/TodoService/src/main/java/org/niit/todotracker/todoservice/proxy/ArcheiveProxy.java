package org.niit.todotracker.todoservice.proxy;


import org.niit.todotracker.todoservice.domain.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="archive-service", url="localhost:8097")
public interface ArcheiveProxy
{
    @PostMapping("/archiveService/register")
    ResponseEntity<?> register(@RequestBody User user);
}
