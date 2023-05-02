package com.example.MailService.Rabbitmq;

import com.example.MailService.Domain.EmailData;
import com.example.MailService.Service.ConsumerService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Consumer
{
    @Autowired
    private ConsumerService consumerService;


    @RabbitListener(queues = "mail_queue")
    public void getDtoFromQueue(EmailDTO emailDTO)
    {
        System.out.println(emailDTO.getEmailid());
        System.out.println(emailDTO.getMessageBody());
        System.out.println(emailDTO.getSubject());
        System.out.println("Inside Consumer");
        EmailData emailData=new EmailData(emailDTO.getEmailid(),emailDTO.getMessageBody(),emailDTO.getSubject());
        consumerService.sendEmail(emailData);
    }
}
