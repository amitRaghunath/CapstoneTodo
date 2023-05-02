package com.niit.todotraker.userservice.service;

import com.niit.todotraker.userservice.domain.User;
import com.niit.todotraker.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements IUserService{
    UserRepository userRepository;
@Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User addUser(User user) {
    if(userRepository.findById(user.getEmail()).isEmpty()){
        return userRepository.save(user);
    }else
        return null;
    }

    @Override
    public User logIn(String email,String password) {
       if(userRepository.findById(email).isEmpty()){
           return null;
       }else {
           User user=userRepository.findById(email).get();
           if(user.getEmail().equals(email)&& user.getPassword().equals(password)){
               return user;
           }
       }
        return null;
    }

    @Override
    public User updatePassword(String email, User user)
    {
        if(userRepository.findById(email).isEmpty())
        {
            return null;
        }

        User isExist = userRepository.findById(email).get();
        isExist.setEmail(user.getEmail());
        isExist.setPassword(user.getPassword());
        return userRepository.save(isExist);
    }
}
