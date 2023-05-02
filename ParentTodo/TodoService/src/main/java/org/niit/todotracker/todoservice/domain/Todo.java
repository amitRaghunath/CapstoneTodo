package org.niit.todotracker.todoservice.domain;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Todo
{
       @Id
       private String todoId;
       private String todoTitle;
       private String todoDesc;
       private String priorities;
       private LocalDateTime dueDate;
       private LocalDateTime reminderDate;
       private Set<Category> categorySet;
}
