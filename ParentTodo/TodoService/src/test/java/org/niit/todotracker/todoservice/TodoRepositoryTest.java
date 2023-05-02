package org.niit.todotracker.todoservice;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.niit.todotracker.todoservice.domain.Category;
import org.niit.todotracker.todoservice.domain.Todo;
import org.niit.todotracker.todoservice.domain.User;
import org.niit.todotracker.todoservice.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(SpringExtension.class)
@DataMongoTest
public class TodoRepositoryTest
{
    private User user;
    private User user1;
    private Set<Todo> setTodo;
    private Set<Category> setCat;
    private LocalDateTime now= LocalDateTime.now();
    private Todo todo;

    private Category category;


    @Autowired
    private IUserRepository iUserRepository;

    @BeforeEach
    public void setUp()
    {
//        todo=new Todo("101","TestTodo","Some Description","High", now,now, setCat);
//        category=new Category("101","My Category", setTodo);
        setTodo=new HashSet<>();
        setCat=new HashSet<>();
        setTodo.add(new Todo("101","TestTodo","Some Description","High", now,now, null));
        setCat.add(new Category("101","My Category", null));

        user=new User("Drake","xyz","10101010","abc@gmail.com","abc@951","abc@951", setCat, setTodo);
        user1=new User("Drake","xyz","10101010","abc@gmail.com","abc@951","abc@951", setCat, setTodo);
    }

    @Test
    @DisplayName("Test case to check save")
    void givenShouldReturnSaveId()
    {
        iUserRepository.save(user);
        User u1=iUserRepository.findById(user.getEmail()).get();
        assertNotNull(u1);
        assertEquals(user.getEmail(),u1.getEmail());
    }
    @Test
    @DisplayName("Test case to check todo")
    void givenShouldReturnSaveTodo()
    {
        iUserRepository.save(user);
        User u1=iUserRepository.findById(user.getEmail()).get();
        assertNotNull(u1);
        assertEquals(user.getTodos().size(),u1.getTodos().size());
    }

    @Test
    @DisplayName("Test case to check Delete")
    void givenShouldReturnDelete()
    {
        iUserRepository.save(user);
        User u1=iUserRepository.findById(user.getEmail()).get();
        assertNotNull(u1);
        assertEquals(user.getTodos().size(),u1.getTodos().size());
    }

    @Test
    @DisplayName("Test Case For Delete Todo ")
    public void testForDeleteTodo(){

        User user1=iUserRepository.findById(user.getEmail()).get();
        Set<Todo> todo1=iUserRepository.findById(user1.getEmail()).get().getTodos();

        Iterator<Todo> iterator=todo1.iterator();
        while (iterator.hasNext())
        {
            Todo todo2=iterator.next();
            iterator.remove();
        }

        user.setTodos(todo1);
        user1.setTodos(todo1);
        assertEquals(user.getTodos().size(),user1.getTodos().size());

    }
    @Test
    @DisplayName("Test Case For Saving Category ")
    public void testForSaveCategory(){
        iUserRepository.save(user);
        User user1=iUserRepository.findById(user.getEmail()).get();
        assertEquals(user.getCategorySet().size(),user1.getCategorySet().size());
    }


    @Test
    @DisplayName("Test Case For Delete Category ")
    public void testForDeleteCategory(){

        User user1=iUserRepository.findById(user.getEmail()).get();
        Set<Category> categorySet1=iUserRepository.findById(user1.getEmail()).get().getCategorySet();

        Iterator<Category> iterator=categorySet1.iterator();
        while (iterator.hasNext()){
            Category category1=iterator.next();
            iterator.remove();
        }

        user.setCategorySet(categorySet1);
        user1.setCategorySet(categorySet1);
        assertEquals(user.getCategorySet().size(),user1.getCategorySet().size());

    }

    @AfterEach
    void clear()
    {
        user=null;
    }




}
