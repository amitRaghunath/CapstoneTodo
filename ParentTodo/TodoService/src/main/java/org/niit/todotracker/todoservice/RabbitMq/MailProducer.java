package org.niit.todotracker.todoservice.RabbitMq;

import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MailProducer
{
    @Autowired
    private RabbitTemplate rabbitTemplate;
    @Autowired
    private DirectExchange directExchange;

    @Autowired
    private Queue queue;

    public void sendMailDtoQueue(EmailDto emailDto)
    {
        rabbitTemplate.convertAndSend(directExchange.getName(),"mail_routing",emailDto);
    }
}
