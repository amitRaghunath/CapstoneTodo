package com.niit.todotraker.userservice.service;

import com.niit.todotraker.userservice.domain.User;

public interface IUserService {

    public User addUser(User user);
    public User logIn(String email,String password);

    public User updatePassword(String email,User user);
}
