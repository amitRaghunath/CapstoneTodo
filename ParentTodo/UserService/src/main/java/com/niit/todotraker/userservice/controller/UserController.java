package com.niit.todotraker.userservice.controller;

import com.niit.todotraker.userservice.domain.User;
import com.niit.todotraker.userservice.security.ISecurity;
import com.niit.todotraker.userservice.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/userService")

public class UserController {

    IUserService iUserService;
    ISecurity iSecurity;
@Autowired
    public UserController(IUserService iUserService, ISecurity iSecurity) {
        this.iUserService = iUserService;
        this.iSecurity = iSecurity;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user){
    return new ResponseEntity<>(iUserService.addUser(user), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){
        User result=iUserService.logIn(user.getEmail(),user.getPassword());
        if(result!=null)
        {
            Map<String,String> key=iSecurity.tokenGenerate(user);
            return new ResponseEntity<>(key,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("Authentication failed",HttpStatus.NOT_FOUND);
        }
   }

   @PutMapping("/update/{emailid}")
    public ResponseEntity<?>updatePassword(@RequestBody User user,@PathVariable String emailid)
   {
       return new ResponseEntity<>(iUserService.updatePassword(emailid,user),HttpStatus.ACCEPTED);
   }
//    @PostMapping("/register")
//    public ResponseEntity<?> register(@RequestParam("user") String user, @RequestParam("file") MultipartFile file) throws IOException {
//        User userDetails = new ObjectMapper().readValue(user, User.class);
//        userDetails.setProfile(file.getBytes());
//        return new ResponseEntity<>(todoService.registerUser(userDetails), HttpStatus.CREATED);
//    }

}
