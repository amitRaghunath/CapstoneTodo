package com.niit.ArchiveService.controller;


import com.niit.ArchiveService.domain.Todo;
import com.niit.ArchiveService.domain.User;
import com.niit.ArchiveService.service.IArchiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/archiveService")
public class ArchiveController {

    IArchiveService iArchiveService;
@Autowired
    public ArchiveController(IArchiveService iArchiveService) {
        this.iArchiveService = iArchiveService;
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user)  {
        return new ResponseEntity<>(iArchiveService.registerUser(user), HttpStatus.CREATED);}

    @PostMapping("/addArchivedTodo")
    public ResponseEntity<?> addUsersTodoToListArchived(@RequestBody Todo todo, HttpServletRequest request){
        String userEmail=(String)request.getAttribute("emailid");
        return new ResponseEntity<>(iArchiveService.addUsersTodoToListArchived(todo,userEmail), HttpStatus.CREATED);
    }

    @PostMapping("/addCompletedTodos")
    public ResponseEntity<?> addUsersTodoToListCompleted(@RequestBody Todo todo, HttpServletRequest request){
        String userEmail=(String)request.getAttribute("emailid");
        return new ResponseEntity<>(iArchiveService.addUsersTodoToListCompleted(todo,userEmail), HttpStatus.CREATED);
    }

    @GetMapping("/archivedTodos")
    public ResponseEntity<?> getArchivedTodosFromList(HttpServletRequest request){
        String userEmail=(String)request.getAttribute("emailid");
        return new ResponseEntity<>(iArchiveService.getArchivedTodoOfUser(userEmail), HttpStatus.OK);
    }

    @GetMapping("/completedTodos")
    public ResponseEntity<?> getCompletedTodosFromList(HttpServletRequest request){
        String userEmail=(String)request.getAttribute("emailid");
        return new ResponseEntity<>(iArchiveService.getCompletedTodoOfUser(userEmail), HttpStatus.OK);
    }

    @DeleteMapping("/deleteTodo/{todoId}")
    public ResponseEntity<?> deleteTodo(HttpServletRequest request,@PathVariable String todoId){
        String userEmail=(String)request.getAttribute("emailid");
        return new ResponseEntity<>(iArchiveService.deleteTodo(userEmail,todoId),HttpStatus.OK);
    }


}
