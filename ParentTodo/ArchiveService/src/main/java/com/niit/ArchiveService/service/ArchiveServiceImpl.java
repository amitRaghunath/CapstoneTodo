package com.niit.ArchiveService.service;

import com.niit.ArchiveService.domain.Category;
import com.niit.ArchiveService.domain.Todo;
import com.niit.ArchiveService.domain.User;
import com.niit.ArchiveService.repository.ArchiveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ArchiveServiceImpl implements IArchiveService{

    ArchiveRepository archiveRepository;
@Autowired
    public ArchiveServiceImpl(ArchiveRepository archiveRepository) {
        this.archiveRepository = archiveRepository;
    }

    @Override
    public User registerUser(User user) {
       if(archiveRepository.findById(user.getEmail()).isEmpty()){
           return archiveRepository.save(user);
       }
       return null;
    }

    @Override
    public List<Todo> getArchivedTodoOfUser(String email) {
        if(archiveRepository.findById(email).isEmpty()){
           // throw new ResourceNotFoundException("user","id",email);
            return null;
        }
        return archiveRepository.findById(email).get().getArchivedTodos();
    }

    @Override
    public List<Todo> getCompletedTodoOfUser(String email) {
        if(archiveRepository.findById(email).isEmpty()){
            return null;
        }
        return archiveRepository.findById(email).get().getCompletedTodos();
    }
    @Override
    public boolean deleteTodo(String email, String todoId) {
        User user=archiveRepository.findById(email).get();
        List<Todo> todoList = user.getCompletedTodos();
        Iterator<Todo> iterator=todoList.iterator();
        while(iterator.hasNext())
        {
            Todo todo=iterator.next();
            if(todo.getTodoId().equals(todoId))
            {
                iterator.remove();
            }
        }
        user.setCompletedTodos(todoList);
        archiveRepository.save(user);
        return true;
    }

    @Override
    public User addUsersTodoToListArchived(Todo todo, String email) {
        String todoId = UUID.randomUUID().toString();
        todo.setTodoId(todoId);
        todo.setArchived("archived");
        if (archiveRepository.findById(email).isPresent()) {
            User user = archiveRepository.findById(email).get();
            List<Todo> allTodos = user.getArchivedTodos();
            if (user.getArchivedTodos() != null) {
                boolean check = false;
                for (Todo todos : allTodos) {
                    if (todos.getTodoTitle().equals(todo.getTodoTitle())) {
                        check = true;
                        break;
                    }
                }
                if (!check){
                    allTodos.add(todo);
                    user.setArchivedTodos(allTodos);
                }

            } else {
                user.setArchivedTodos(new ArrayList<>());
                user.getArchivedTodos().add(todo);
            }

            return archiveRepository.save(user);
        }
       return null;
    }



    @Override
    public User addUsersTodoToListCompleted(Todo todo, String email) {
        String todoId = UUID.randomUUID().toString();
        todo.setTodoId(todoId);
        todo.setCompleted("completed");
        if (archiveRepository.findById(email).isPresent()) {
            User user = archiveRepository.findById(email).get();
            List<Todo> allTodos = user.getCompletedTodos();
            if (user.getCompletedTodos() != null) {
                boolean check = false;
                for (Todo todos : allTodos) {
                    if (todos.getTodoTitle().equals(todo.getTodoTitle())) {
                        check = true;
                        break;
                    }
                }
                if (!check){
                    allTodos.add(todo);
                    user.setCompletedTodos(allTodos);
                }

            } else {
                user.setCompletedTodos(new ArrayList<>());
                user.getCompletedTodos().add(todo);
            }

            return archiveRepository.save(user);
        }
        return null;
    }
}










