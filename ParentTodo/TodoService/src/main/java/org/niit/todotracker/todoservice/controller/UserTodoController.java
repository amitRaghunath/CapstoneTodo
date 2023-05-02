package org.niit.todotracker.todoservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import org.niit.todotracker.todoservice.Exception.ResourceAlreadyExistException;
import org.niit.todotracker.todoservice.RabbitMq.EmailDto;
import org.niit.todotracker.todoservice.domain.Category;
import org.niit.todotracker.todoservice.domain.Todo;
import org.niit.todotracker.todoservice.domain.User;
import org.niit.todotracker.todoservice.service.ITodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.util.Set;

@RestController
@RequestMapping("/userTodo")

public class UserTodoController {

   private ITodoService todoService;

   @Autowired
    public UserTodoController(ITodoService todoService) {
        this.todoService = todoService;
    }


//    @PostMapping("/register")
//   @Consumes(MediaType.APPLICATION_JSON)
//    @Produces(MediaType.APPLICATION_JSON)
//    public ResponseEntity<?> register(@RequestParam("commonUser") String user, @RequestParam("file") MultipartFile file) throws IOException {
//        User userDetails = new ObjectMapper().readValue(user, User.class);
//
//        userDetails.setProfile(file.getBytes());
//
//        return new ResponseEntity<>(todoService.registerUser(userDetails), HttpStatus.CREATED);
//    }
    @PostMapping("/register")
    public ResponseEntity<?>register(@RequestBody User user)throws ResourceAlreadyExistException
    {
        ResponseEntity response;
        try{
           response= new ResponseEntity<>(todoService.registerUser(user),HttpStatus.OK);
        }
        catch (ResourceAlreadyExistException r)
        {
            response=new ResponseEntity<>("error",HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @GetMapping("/allUser")
    public ResponseEntity<?> getAllUsers(){
       return new ResponseEntity<>(todoService.getAllUsers(), HttpStatus.OK);
    }

    @PostMapping("/addCategory")
    public ResponseEntity<?> addUsersCategoryToList(@RequestBody Category category,HttpServletRequest request){
       String id=(String)request.getAttribute("emailid");
       return new ResponseEntity<>(todoService.addUsersCategoryToList(category,id), HttpStatus.CREATED);
    }

    @PostMapping("/addTodo")
    public ResponseEntity<?> addUsersTodoToList(@RequestBody Todo todo,HttpServletRequest request){
        String userEmail = (String)request.getAttribute("emailid");
        return new ResponseEntity<>(todoService.addUsersTodoToList(todo,userEmail), HttpStatus.CREATED);
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getCategoriesFromList(HttpServletRequest request)
    {
        String userEmail = (String)request.getAttribute("emailid");
        System.out.println("Inside getallcatergorires "+userEmail);
        return new ResponseEntity<>(todoService.getAllCategoriesOfUser(userEmail), HttpStatus.OK);
    }

    @GetMapping("/todos")
    public ResponseEntity<?> getTodosFromList(HttpServletRequest request)
    {
        String userEmail = (String)request.getAttribute("emailid");
        return new ResponseEntity<>(todoService.getAllTodosOfUser(userEmail), HttpStatus.OK);
    }
    @PostMapping("/addTodoIntoCategory/{categoryName}")
    public ResponseEntity<?> addTodosIntoCategory(@RequestBody Todo todo, @PathVariable String categoryName,HttpServletRequest request )
    {
        String userEmail = (String)request.getAttribute("emailid");
       return new ResponseEntity<>(todoService.addTodosIntoCategories(todo, categoryName, userEmail), HttpStatus.OK);
    }

    @PostMapping("/addTodosCategory/{todoTitle}")
    public ResponseEntity<?> addCategoryOfTodos(@RequestBody Category category, @PathVariable String todoTitle,HttpServletRequest request)
    {
        String userEmail = (String)request.getAttribute("emailid");

        return new ResponseEntity<>(todoService.addCategoriesOfTodos(category, todoTitle, userEmail), HttpStatus.OK);
    }

//    @GetMapping("/{userId}")
//    public ResponseEntity<?> getUserId()
//    {
//        String userEmail = (String)request.getAttribute("emailid");
//        return new ResponseEntity<>(todoService.searchUserByEmail(userId), HttpStatus.OK);
//    }


    @GetMapping("/current-user")
    public ResponseEntity<?> getUserId(HttpServletRequest request){
        Claims claims = (Claims) request.getAttribute("claims");
        String userEmail = (String)request.getAttribute("emailid");
        return new ResponseEntity<>(todoService.searchUserByEmail(userEmail), HttpStatus.OK);
    }

    @PutMapping("/updateUser")
    public ResponseEntity<?> updatetodo(@RequestBody User user,HttpServletRequest request)
    {
        String id=(String)request.getAttribute("emailid");
        return new ResponseEntity<>(todoService.updateDetails(id,user),HttpStatus.CREATED);
    }

    @PutMapping("/updateTodo/{todoid}")
    public ResponseEntity<?> updatetodo(@RequestBody Todo todo,@PathVariable String todoid,HttpServletRequest request)
    {
        String id=(String)request.getAttribute("emailid");
        return new ResponseEntity<>(todoService.updateTodosDetails(id,todo,todoid),HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteTodo/{todoid}")
    public ResponseEntity<?>deletetodo(@PathVariable String todoid,HttpServletRequest request)
    {
        String id=(String)request.getAttribute("emailid");
        return new ResponseEntity<>(todoService.deleteTodos(id,todoid),HttpStatus.OK);
    }

    @GetMapping("/otp/{emailid}")
    public ResponseEntity<?>getOtp(@PathVariable String emailid)
    {
        return new ResponseEntity<>(todoService.verifyotp(emailid),HttpStatus.CREATED);
    }

    @PostMapping("/enquiry")
    public ResponseEntity<?>enquiryMail(@RequestBody EmailDto emailDto)
    {
        return new ResponseEntity<>(todoService.enquiryMail(emailDto),HttpStatus.OK);
    }


    @PutMapping("/update/{emailid}")
    public ResponseEntity<?>updatePassword(@RequestBody User user,@PathVariable String emailid)
    {
        return new ResponseEntity<>(todoService.updatePassword(emailid,user),HttpStatus.ACCEPTED);
    }
    @DeleteMapping("/deleteCategory/{categoryId}")
    public ResponseEntity<Boolean> deleteCategory(@PathVariable String categoryId, HttpServletRequest request){
        Claims claims = (Claims) request.getAttribute("claims");
        String userEmail = claims.getSubject();
        return new ResponseEntity<>(todoService.deleteCategory(userEmail, categoryId),HttpStatus.OK);
    }

    @DeleteMapping("/deleteTodoFromCategory/{todoId}/{categoryId}")
    public ResponseEntity<Boolean> deleteTodoFromCategory(@PathVariable String todoId,@PathVariable String categoryId, HttpServletRequest request){

        String userEmail = (String)request.getAttribute("emailid");
        return new ResponseEntity<>(todoService.deleteTodoFromCategory(userEmail, todoId,categoryId),HttpStatus.OK);
    }

    @GetMapping("/getTodosOfCategory/{categoryId}")
    public ResponseEntity<Set<Todo>> getTodosOfCategory(@PathVariable String categoryId, HttpServletRequest request){
        Claims claims = (Claims) request.getAttribute("claims");
        String userEmail = claims.getSubject();
        String id=(String)request.getAttribute("emailid");
        return new ResponseEntity<>(todoService.getTodosFromCategory(id,categoryId), HttpStatus.OK);
    }
    @GetMapping("/getSingleTodo/{todoId}/{categoryName}")
    public ResponseEntity<Todo> getTodoAsPerId(@PathVariable String todoId, @PathVariable String categoryName, HttpServletRequest request){

        String userEmail = (String)request.getAttribute("emailid");
        return new ResponseEntity<>(todoService.getTodoByTodoId(userEmail, todoId, categoryName), HttpStatus.OK);
    }
}
