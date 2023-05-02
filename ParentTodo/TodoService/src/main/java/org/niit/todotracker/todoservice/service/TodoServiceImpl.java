package org.niit.todotracker.todoservice.service;

import org.niit.todotracker.todoservice.Exception.ResourceAlreadyExistException;
import org.niit.todotracker.todoservice.Exception.ResourceNotFoundException;
import org.niit.todotracker.todoservice.RabbitMq.EmailDto;
import org.niit.todotracker.todoservice.RabbitMq.MailProducer;
import org.niit.todotracker.todoservice.domain.Category;
import org.niit.todotracker.todoservice.domain.Todo;
import org.niit.todotracker.todoservice.domain.User;
import org.niit.todotracker.todoservice.domain.UserDTO;
import org.niit.todotracker.todoservice.proxy.ArcheiveProxy;
import org.niit.todotracker.todoservice.proxy.UserProxy;
import org.niit.todotracker.todoservice.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class TodoServiceImpl implements ITodoService{

    IUserRepository userRepository;

    UserProxy proxy;

    ArcheiveProxy archeiveProxy;
     MailProducer mailProducer;

    @Autowired
    public TodoServiceImpl(IUserRepository userRepository, UserProxy proxy, MailProducer mailProducer,ArcheiveProxy archeiveProxy) {
        this.userRepository = userRepository;
        this.proxy = proxy;
        this.mailProducer=mailProducer;
        this.archeiveProxy=archeiveProxy;
    }

    @Override
    public User registerUser(User user) {
        if(userRepository.findById(user.getEmail()).isPresent()){
            throw new ResourceAlreadyExistException();
           // return null;
        }
        UserDTO userDTO=new UserDTO();
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        proxy.register(userDTO);
        User user1=userRepository.insert(user);
        System.out.println(user1);
        archeiveProxy.register(user);

//       EmailDto emailDto=new EmailDto(user1.getEmail(),"WELCOME TO TODO APPLICATION",
//               "Registered Successfully -_-");
//        System.out.println("Inside todo service "+emailDto.getEmailid());
//        mailProducer.sendMailDtoQueue(emailDto);
       return user1;
    }
    @Override
    public int generateOtp()
    {
        int otp= ThreadLocalRandom.current().nextInt(1000,9999);
        return otp;
    }

    @Override
    public String verifyotp(String email)
    {

        int otp=generateOtp();
//        mailProducer.sendMailDtoQueue( new EmailDto(email,"OTP From Todo App "+otp ,
//             "OTP"));
        return otp+"";
    }

    @Override
    public String enquiryMail(EmailDto emailDto)
    {
      mailProducer.sendMailDtoQueue(new EmailDto("myTodo@gmail.com", emailDto.getMessageBody(), "Enquiry From"+emailDto.getEmailid()));
      return "Successfull";
    }


    @Override
    public List<User> getAllUsers()
    {
        if(userRepository.findAll().isEmpty())
        {
            throw  new ResourceNotFoundException();
        }
        return userRepository.findAll();
    }

    @Override
    public User addUsersCategoryToList(Category category, String userEmail)
    {
        System.out.println(userEmail);
        String categoryId = UUID.randomUUID().toString();
        category.setCategoryId(categoryId);
        if (userRepository.findById(userEmail).isPresent())
        {
            System.out.println("Inside If Condition");
            User user = userRepository.findById(userEmail).get();
            Set<Category> allCategories = user.getCategorySet();
            if (user.getCategorySet() != null) {
                boolean check = false;
                for (Category categories : allCategories) {
                    if (categories.getCategoryName().equals(category.getCategoryName())) {
                        check = true;
                        break;
                    }
                }
                if (!check) {
                    allCategories.add(category);
                    user.setCategorySet(allCategories);
                }

            } else {
                user.setCategorySet(new HashSet<>());
                user.getCategorySet().add(category);
            }
            return userRepository.save(user);
        }
        throw new ResourceNotFoundException();
    }

    @Override
    public User addUsersTodoToList(Todo todo, String userEmail) {
        String todoId = UUID.randomUUID().toString();
        todo.setTodoId(todoId);
        if (userRepository.findById(userEmail).isPresent()) {
            User user = userRepository.findById(userEmail).get();
            Set<Todo> allTodos = user.getTodos();
            if (user.getTodos() != null) {
                boolean check = false;
                for (Todo todos : allTodos) {
                    if (todos.getTodoTitle().equals(todo.getTodoTitle())) {
                        check = true;
                        break;
                    }
                }
                if (!check) {
                    allTodos.add(todo);
                    user.setTodos(allTodos);
                }

            } else {
                user.setTodos(new HashSet<>());
                user.getTodos().add(todo);
            }
            return userRepository.save(user);
        }
        throw new ResourceNotFoundException();
    }

    @Override
    public Set<Category> getAllCategoriesOfUser(String userEmail) {
        if(userRepository.findById(userEmail).isEmpty()){
            throw new ResourceNotFoundException();
        }
        return userRepository.findById(userEmail).get().getCategorySet();
    }

    @Override
    public Set<Todo> getAllTodosOfUser(String userEmail) {
        if(userRepository.findById(userEmail).isEmpty()){
            throw new ResourceNotFoundException();
        }
        return userRepository.findById(userEmail).get().getTodos();
    }

    @Override
    public Category addTodosIntoCategories(Todo todo, String categoryName, String userEmail) {
        String todoId = UUID.randomUUID().toString();
        todo.setTodoId(todoId);
        if(userRepository.findById(userEmail).isPresent()) {


            User user = userRepository.findById(userEmail).get();
            Set<Category> allCategories = userRepository.findById(userEmail).get().getCategorySet();
            Category category = null;
            for (Category cat : allCategories) {
                if (cat.getCategoryName().equals(categoryName)) {
                    category = cat;
                }
            }
            allCategories.remove(category);
            Set<Todo> todos = category.getTodos();
            if (todos != null) {
                boolean check = false;
                for (Todo todoD : todos) {
                    if (todoD.getTodoTitle().equals(todo.getTodoTitle())) {
                        check = true;
                    }

                }
                if (!check) {
                    todos.add(todo);
                    category.setTodos(todos);
                }
            } else {
                category.setTodos(new HashSet<>());
                category.getTodos().add(todo);
            }
            allCategories.add(category);
            user.setCategorySet(allCategories);
            userRepository.save(user);
            return category;
        }
        throw new ResourceNotFoundException();

    }

    @Override
    public Todo addCategoriesOfTodos(Category category, String todoTitle, String userEmail) {
        User user=userRepository.findById(userEmail).get();
        Set<Todo> allTodos=userRepository.findById(userEmail).get().getTodos();
        Todo todo=null;
        for(Todo todos:allTodos)
        {
            if(todos.getTodoTitle().equals(todoTitle))
            {
                todo=todos;
            }
        }
        allTodos.remove(todo);
        Set<Category> categories=todo.getCategorySet();
        if(categories!=null)
        {
            boolean check=false;
            for(Category cat:categories)
            {
                if(cat.getCategoryName().equals(category.getCategoryName()))
                {
                    check=true;
                }

            }
            if(!check) {
                categories.add(category);
                todo.setCategorySet(categories);
            }
        }
        else {
            todo.setCategorySet(new HashSet<>());
            todo.getCategorySet().add(category);
        }
        allTodos.add(todo);
        user.setTodos(allTodos);
        userRepository.save(user);
        return todo;
    }

    @Override
    public User searchUserByEmail(String emailId) {
        return userRepository.findById(emailId).get();


    }


    @Override
    public Set<Todo> updateTodosDetails(String userEmail, Todo todo, String todoId) {
        if(userRepository.findById(userEmail).isEmpty())
        {
           throw new ResourceNotFoundException("user","id", userEmail);
        }
        User isExist = userRepository.findById(userEmail).get();
        Set<Todo> allTodos = isExist.getTodos();
        Todo singleTodo = null;
        boolean isExistTodo = false;
        for(Todo todos:allTodos)
        {
            if(todos.getTodoId().equals(todoId))
            {
                isExistTodo = true;
                singleTodo = todos;
                break;
            }
        }
        singleTodo.setTodoTitle(todo.getTodoTitle());
        singleTodo.setTodoDesc(todo.getTodoDesc());
        singleTodo.setDueDate(todo.getDueDate());
        singleTodo.setPriorities(todo.getPriorities());
        allTodos.add(singleTodo);
        userRepository.save(isExist);
        return allTodos;
    }
    @Override
    public User updateDetails(String userEmail, User user) {
        if(userRepository.findById(userEmail).isEmpty())
        {
           throw new ResourceNotFoundException("user", "id", userEmail);

        }
        User isExist = userRepository.findById(userEmail).get();
        isExist.setFullname(user.getFullname());
        isExist.setEmail(user.getEmail());
        isExist.setContact(user.getContact());
        isExist.setProfile(user.getProfile());
        userRepository.save(isExist);
        return isExist;
    }

    @Override
    public User updatePassword(String email, User user)
    {
        if(userRepository.findById(email).isEmpty())
        {
            return null;
        }

        User isExist = userRepository.findById(email).get();
        UserDTO dto=new UserDTO(user.getEmail(), user.getPassword());
        proxy.updatePassword(dto,email);
        isExist.setEmail(user.getEmail());
        isExist.setPassword(user.getPassword());
        return userRepository.save(isExist);
    }

    @Override
    public boolean deleteCategory(String email, String categoryId)
    {
        if(userRepository.findById(email).isEmpty())
        {
            throw new ResourceNotFoundException("user", "id", email);

        }
        User user=userRepository.findById(email).get();
        Set<Category> categorySet=user.getCategorySet();
        Iterator<Category> iterator=categorySet.iterator();
        while(iterator.hasNext())
        {
            Category category=iterator.next();
            if(category.getCategoryId().equals(categoryId))
            {
                iterator.remove();
            }
        }
        user.setCategorySet(categorySet);
        userRepository.save(user);
        return true;
    }

    @Override
    public boolean deleteTodoFromCategory(String email, String todoId, String categoryId)
    {
        User user=userRepository.findById(email).get();
        Set<Category> categorySet=user.getCategorySet();

        Category category1=null;
        for(Category c:categorySet)
        {
            System.out.println(c);
            if(c.getCategoryId().equalsIgnoreCase(categoryId))
            {
                category1=c;
            }
        }

        categorySet.remove(category1);
        Set<Todo> todoList=category1.getTodos();
        Iterator<Todo> iterator=todoList.iterator();
        while(iterator.hasNext())
        {
            Todo todolist1=iterator.next();
            if(todolist1.getTodoId().equalsIgnoreCase(todoId))
            {
                iterator.remove();
            }
        }
        category1.setTodos(todoList);
        categorySet.add(category1);
        user.setCategorySet(categorySet);
        userRepository.save(user);
        return true;
    }

    //Deleting todos from list
    @Override
    public boolean deleteTodos(String email, String todoId) {
        if(userRepository.findById(email).isEmpty()){
           throw new ResourceNotFoundException("user", "id", email);

        }
        User user=userRepository.findById(email).get();
        Set<Todo> todoList=user.getTodos();
        Iterator<Todo> iterator=todoList.iterator();
        while(iterator.hasNext())
        {
            Todo todo=iterator.next();
            if(todo.getTodoId().equals(todoId))
            {
                iterator.remove();
            }
        }
        user.setTodos(todoList);
        userRepository.save(user);
        return true;
    }

    @Override
    public Set<Todo> getTodosFromCategory(String userEmail, String categoryId) {
        Set<Todo> todosOfCategory = null;
        boolean result = false;
        if (this.userRepository.findById(userEmail).isEmpty()) {
            throw new ResourceNotFoundException("user", "id", userEmail);

        } else {
            User userData = userRepository.findById(userEmail).get();
            Set<Category> categories = userData.getCategorySet();
            if (categories != null) {
                Category categoryDetails = null;
                for (Category category : categories) {
                    if (category.getCategoryId().equalsIgnoreCase(categoryId)) {
                        result = true;
                        categoryDetails = category;
                        break;
                    }
                }
                if (result) {
                    todosOfCategory = categoryDetails.getTodos();
                }
            }else{
               throw new ResourceNotFoundException();

            }
            return todosOfCategory;
        }
    }

    @Override
    public Todo getTodoByTodoId(String userEmail, String todoId, String categoryName) {
        if(userRepository.findById(userEmail).isEmpty()) {
           throw new ResourceNotFoundException("user", "id", userEmail);

        }
        User user = userRepository.findById(userEmail).get();
        Set<Category> allCategory = user.getCategorySet();
        boolean categoryExist = false;
        Category category = null;
        for(Category categories:allCategory){
            if(categories.getCategoryId().equals(categoryName)){
                categoryExist = true;
                category = categories;
                break;
            }
        }
        if(categoryExist) {
            Set<Todo> allTodos = category.getTodos();
            boolean todoExist = false;
            Todo todo = null;
            for (Todo todos : allTodos) {
                if (todos.getTodoId().equals(todoId)) {
                    todoExist = true;
                    todo = todos;
                }
            }
            return todo;
        }
        throw new ResourceNotFoundException("user", "id", userEmail);

    }




}
