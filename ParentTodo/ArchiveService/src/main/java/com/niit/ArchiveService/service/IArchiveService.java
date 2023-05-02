package com.niit.ArchiveService.service;

import com.niit.ArchiveService.domain.Category;
import com.niit.ArchiveService.domain.Todo;
import com.niit.ArchiveService.domain.User;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;
import java.util.Set;

public interface IArchiveService {
    User registerUser(User user);


    public boolean deleteTodo(String email,String todoId);






    List<Todo> getArchivedTodoOfUser(String email);

    List<Todo> getCompletedTodoOfUser(String email);

    User addUsersTodoToListArchived(Todo todo, String email);

    User addUsersTodoToListCompleted(Todo todo, String email);







//    Set<Todo> getDeletedTodo(String emailId) ;
//    Set<Todo> getCompletedTodo(String emailId) ;
//    Set<Category> getDeletedCategory(String emailId) ;
//    Set<Category> getCompletedCategory(String emailId) ;
}
