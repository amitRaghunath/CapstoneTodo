package com.niit.todotraker.userservice.security;

import com.niit.todotraker.userservice.domain.User;

import java.util.Map;

public interface ISecurity {

    public Map<String,String> tokenGenerate(User user);
}
