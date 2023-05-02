package org.niit.todotracker.todoservice.service;


import org.niit.todotracker.todoservice.RabbitMq.EmailDto;
import org.niit.todotracker.todoservice.domain.Category;
import org.niit.todotracker.todoservice.domain.Todo;
import org.niit.todotracker.todoservice.domain.User;

import java.util.List;
import java.util.Set;

public interface ITodoService {
   User registerUser(User user);
   List<User> getAllUsers();
   User addUsersCategoryToList(Category category, String userEmail);
   User addUsersTodoToList(Todo todo, String userEmail);
   Set<Category> getAllCategoriesOfUser(String userEmail);
   Set<Todo> getAllTodosOfUser(String userEmail);

   Category addTodosIntoCategories(Todo todo, String categoryName, String userEmail);

   Todo addCategoriesOfTodos(Category category, String todoTitle, String userEmail);
   User searchUserByEmail(String emailId);

   Set<Todo> updateTodosDetails(String userEmail, Todo todo, String todoId);

   public User updateDetails(String userEmail, User user);

   public boolean deleteTodos(String email, String todoId);

   public int generateOtp();

   public String verifyotp(String email);

   public String enquiryMail(EmailDto emailDto);
   public User updatePassword(String email, User user);
   public boolean deleteCategory(String email,String categoryId);
   public boolean deleteTodoFromCategory(String email,String todoId,String categoryId);
   Set<Todo> getTodosFromCategory(String userEmail, String categoryId);

   public Todo getTodoByTodoId(String userEmail, String todoId, String categoryName);

}
