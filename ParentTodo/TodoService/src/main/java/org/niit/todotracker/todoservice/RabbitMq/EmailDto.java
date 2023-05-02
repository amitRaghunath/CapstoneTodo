package org.niit.todotracker.todoservice.RabbitMq;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmailDto
{
    private String emailid,messageBody,subject;
}
