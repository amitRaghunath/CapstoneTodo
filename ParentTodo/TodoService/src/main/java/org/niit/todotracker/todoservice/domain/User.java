package org.niit.todotracker.todoservice.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;
import java.util.Set;

@Document
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {

    private String fullname;
    private String profile;
    private String contact;
    @Id
    private String email;
    private String password;
    private String confirmPassword;
    private Set<Category> categorySet;
    private Set<Todo> todos;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(fullname, user.fullname) && Objects.equals(profile, user.profile) && Objects.equals(contact, user.contact) && Objects.equals(email, user.email) && Objects.equals(password, user.password) && Objects.equals(confirmPassword, user.confirmPassword) && Objects.equals(categorySet, user.categorySet) && Objects.equals(todos, user.todos);
    }

    @Override
    public int hashCode() {
        return Objects.hash(fullname, profile, contact, email, password, confirmPassword, categorySet, todos);
    }

//    @PostMapping("/register")
//    public ResponseEntity<?> register(@RequestParam("user") String user, @RequestParam("file") MultipartFile file) throws IOException
//    {
//        User userDetails = new ObjectMapper().readValue(user, User.class);
//        userDetails.setProfile(file.getBytes());
//        return new ResponseEntity<>(todoService.registerUser(userDetails), HttpStatus.CREATED);
//    }

}
