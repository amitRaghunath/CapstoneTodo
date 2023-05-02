package org.niit.todotracker.todoservice.ControllerTest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.niit.todotracker.todoservice.Exception.ResourceAlreadyExistException;
import org.niit.todotracker.todoservice.controller.UserTodoController;
import org.niit.todotracker.todoservice.domain.Category;
import org.niit.todotracker.todoservice.domain.Todo;
import org.niit.todotracker.todoservice.domain.User;
import org.niit.todotracker.todoservice.service.TodoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class ControllerTest
{
    @Mock
    private TodoServiceImpl todoService;

    @InjectMocks
    private UserTodoController userTodoController;

    @Autowired
    private MockMvc mockMvc;

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

        todo=new Todo("101","TestTodo","Some Description","High", null,null, null);
        setTodo.add(todo);

        category=new Category("101","My Category", null);
        setCat.add(category);

        user=new User("Drake","xyz","10101010","abc@gmail.com","abc@951","abc@951", setCat, setTodo);
        usersList=new ArrayList<>();

        usersList.add(user);
        mockMvc= MockMvcBuilders.standaloneSetup(userTodoController).build();
    }

    @Test
    public void saveUserSuccessfully() throws Exception
    {
     when(todoService.registerUser(user)).thenReturn(user);
     mockMvc.perform(post("/userTodo/register").contentType(MediaType.APPLICATION_JSON)
             .content(jsonToString(user))).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
    }
    @Test
    public void saveUserFail() throws Exception
    {
      //  user=new User("Drake","xyz","10101010","abc@gmail.com","abc@951","abc@951", setCat, setTodo);
        when(todoService.registerUser(user)).thenThrow(ResourceAlreadyExistException.class);
        mockMvc.perform(post("/userTodo/register").contentType(MediaType.APPLICATION_JSON)
                .content(jsonToString(user))).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
    }

    private static String jsonToString(Object ob) throws JsonProcessingException {
        System.out.println("Inside Method");
        String result;

            ObjectMapper mapper=new ObjectMapper();
            String jsonContent=mapper.writeValueAsString(ob);
            result=jsonContent;


        return result;
    }
}
