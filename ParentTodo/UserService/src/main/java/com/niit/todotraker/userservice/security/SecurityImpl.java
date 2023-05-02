package com.niit.todotraker.userservice.security;

import com.niit.todotraker.userservice.domain.User;
import com.niit.todotraker.userservice.security.ISecurity;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
@Service
public class SecurityImpl implements ISecurity {
    @Override
    public Map<String, String> tokenGenerate(User user) {
        Map<String,String> result = new HashMap<>();
        Map<String,Object> userData=new HashMap<String,Object>();
        userData.put("email",user.getEmail());
        String jwtToken = Jwts.builder().setSubject(user.getEmail())
                .setClaims(userData)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, "userKey")
                .compact();
        result.put("token", jwtToken);
        result.put("userid", user.getEmail());
        return result;
    }
}
