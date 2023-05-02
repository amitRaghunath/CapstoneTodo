package com.niit.ArchiveService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Todo {
    @Id
    private String todoId;
    private String todoTitle;
    private String todoDesc;
    private LocalDateTime dueDate;
    private LocalDateTime reminderDate;
    private String completed;
    private String archived;
    private String priorities;

}
