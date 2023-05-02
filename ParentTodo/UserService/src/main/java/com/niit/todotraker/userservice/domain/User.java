package com.niit.todotraker.userservice.domain;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Table(name="user_login_details")
public class User {
    @Id
    @Column(name="User_Email")
    private String email;
    @Column(name="User_Password")
    private String password;

}
