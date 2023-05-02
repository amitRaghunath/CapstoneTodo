package com.niit.ArchiveService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.Set;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Category {

    @Id
    private String categoryId;
    private String categoryName;
    private String categoryDescription;
    Set<Todo> todos;
}
