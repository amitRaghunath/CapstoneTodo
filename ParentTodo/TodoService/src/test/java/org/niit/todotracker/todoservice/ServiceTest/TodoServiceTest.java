package org.niit.todotracker.todoservice.ServiceTest;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.niit.todotracker.todoservice.Exception.ResourceAlreadyExistException;
import org.niit.todotracker.todoservice.Exception.ResourceNotFoundException;
import org.niit.todotracker.todoservice.domain.Category;
import org.niit.todotracker.todoservice.domain.Todo;
import org.niit.todotracker.todoservice.domain.User;
import org.niit.todotracker.todoservice.repository.IUserRepository;
import org.niit.todotracker.todoservice.service.TodoServiceImpl;
import org.springframework.data.mongodb.core.mapping.TextScore;

import java.time.LocalDateTime;
import java.util.*;


import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)

public class TodoServiceTest
{
    @Mock
    private IUserRepository iUserRepository;

    @InjectMocks
    private TodoServiceImpl todoService;

    private User user;
    private User user1;
    private Set<Todo> setTodo;
    private Set<Category> setCat;
    private LocalDateTime now= LocalDateTime.now();
    private Todo todo;

    private Category category;
    private List<User> usersList;

    @BeforeEach
    public void setUp()
    {

        setTodo=new HashSet<>();
        setCat=new HashSet<>();

        todo=new Todo("101","TestTodo","Some Description","High", now,now, null);
        setTodo.add(todo);

        category=new Category("101","My Category", null);
        setCat.add(category);

        user=new User("Drake","xyz","10101010","abc@gmail.com","abc@951","abc@951", setCat, setTodo);
        usersList=new ArrayList<>();

        usersList.add(user);
    }
    @Test
    public void saveUserSuccessfully()throws ResourceAlreadyExistException
    {
        User u1=new User("Flake","xyz","10101010","flake@gmail.com","abc@951","abc@951", setCat, setTodo);
        when(iUserRepository.insert(u1)).thenReturn(u1);
        assertEquals(u1,todoService.registerUser(u1));
    }

    @Test
    public void saveUserFailure()
    {
        when(iUserRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        assertThrows(ResourceAlreadyExistException.class,()->todoService.registerUser(user));
    }

    @Test
    public void getAllUsersSuccessfully()throws ResourceNotFoundException
    {
        when(iUserRepository.findAll()).thenReturn(usersList);
        assertEquals(1,todoService.getAllUsers().size());
    }

    @Test
    public void getUserFailure()
    {
        List<User> fail=new ArrayList<>();
        when(iUserRepository.findAll()).thenReturn(fail);
        assertThrows(ResourceNotFoundException.class,()->todoService.getAllUsers());
    }

    @Test
    public void addCategoryOfUserSuccess()
    {
        Set<Category> cat=new HashSet<>();
        Category category1=new Category("101","myTestCat",null);
        cat.add(category1);
        when(iUserRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        when(iUserRepository.save(user)).thenReturn(user);
        assertEquals(user,todoService.addUsersCategoryToList(category1, user.getEmail()));
    }

    @Test
    public void addCategoryOfUserFailure()
    {
        Set<Category> cat=new HashSet<>();
        Category category1=new Category("101","myTestCat",null);
        cat.add(category1);
        when(iUserRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(ResourceNotFoundException.class,()->todoService.addUsersCategoryToList(category1,user.getEmail()));
    }

    @Test
    public void addTodoSuccessfully()
    {

        Todo todo1=new Todo("123","abc","abc123","high",now,now,null);
        when(iUserRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        when(iUserRepository.save(user)).thenReturn(user);
        assertEquals(user,todoService.addUsersTodoToList(todo1,user.getEmail()));

    }
    @Test
    public void addTodoFailure()
    {
        Todo todo1=new Todo("123","abc","abc123","high",now,now,null);
        when(iUserRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(ResourceNotFoundException.class,()->todoService.addUsersTodoToList(todo1,user.getEmail()));
    }

    @Test
    public void getAllCategoriesOfUserSuccess()
    {
        when(iUserRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        Set<Category> ca=todoService.getAllCategoriesOfUser(user.getEmail());
        assertEquals(1,ca.size());
    }

    @Test
    public void getAllCategoriesOfUserFailure()
    {
        when(iUserRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(ResourceNotFoundException.class,()->todoService.getAllCategoriesOfUser(user.getEmail()));
    }

    @Test
    public void getAllTodosOfUserSuccess()
    {
        when(iUserRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        Set<Todo> ta=todoService.getAllTodosOfUser(user.getEmail());
        assertEquals(1,ta.size());
    }

    @Test
    public void getAllTodosOfUserFailure()
    {
        when(iUserRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(ResourceNotFoundException.class,()->todoService.getAllTodosOfUser(user.getEmail()));
    }

    @Test
    public void addTodosIntoCategoriesSuccess()
    {
        when(iUserRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        when(iUserRepository.save(user)).thenReturn(user);
        assertEquals(category,todoService.addTodosIntoCategories(todo,category.getCategoryName(),user.getEmail()));
    }
    @Test
    public void addTodosIntoCategoriesFailure()
    {
        when(iUserRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(ResourceNotFoundException.class,()->todoService.addTodosIntoCategories
                (todo,category.getCategoryName(), user.getEmail()));
    }

    @Test
    public void addCategoriesOfTodosSuccess()
    {
        when(iUserRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        when(iUserRepository.save(user)).thenReturn(user);
        assertEquals(todo,todoService.addCategoriesOfTodos(category,todo.getTodoTitle(),user.getEmail()));
    }

    @Test
    public void updateTodoSuccess()
    {

        Todo t1=new Todo("101","Updated Todo","Some Update","High",now,now,null);
        when(iUserRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        when(iUserRepository.save(user)).thenReturn(user);
        assertEquals(user.getTodos(),todoService.updateTodosDetails(user.getEmail(),t1,"101"));
    }

    @Test
    public void updateTodoFailure()
    {

        Todo t1=new Todo("101","Updated Todo","Some Update","High",now,now,null);
        when(iUserRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(ResourceNotFoundException.class,()->todoService.updateTodosDetails(user.getEmail(), t1,"101"));
    }

    @Test
    public void updateUserDetailsSuccess()
    {
        when(iUserRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        user.setFullname("Flake");
        when(iUserRepository.save(user)).thenReturn(user);
        assertEquals(user,todoService.updateDetails(user.getEmail(),user));
    }

    @Test
    public void updateUserDetailsFailure()
    {
        when(iUserRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(ResourceNotFoundException.class,()->todoService.updateDetails(user.getEmail(), user));
    }
    @Test
    public void DeleteTodoSuccess()
    {
        when(iUserRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        when(iUserRepository.save(user)).thenReturn(user);
        assertEquals(true,todoService.deleteTodos(user.getEmail(),todo.getTodoId()));

    }

    @Test
    public void DeleteTodoFail()
    {
        when(iUserRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(ResourceNotFoundException.class,()->todoService.deleteTodos(user.getEmail(),todo.getTodoId()));
    }

    @Test
    public void DeleteCategorySuccess()
    {
        when(iUserRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        when(iUserRepository.save(user)).thenReturn(user);
        assertEquals(true,todoService.deleteCategory(user.getEmail(),category.getCategoryId()));

    }
    @Test
    public void DeleteCategoryFail()
    {
        when(iUserRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(ResourceNotFoundException.class,()->todoService.deleteCategory(user.getEmail(),category.getCategoryId()));
    }



    @AfterEach
    void clean()
    {
        user=null;
    }
}
