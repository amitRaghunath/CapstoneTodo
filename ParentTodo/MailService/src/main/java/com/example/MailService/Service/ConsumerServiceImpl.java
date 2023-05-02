package com.example.MailService.Service;

import com.example.MailService.Domain.EmailData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ConsumerServiceImpl implements ConsumerService
{
    @Autowired
    private JavaMailSender javaMailSender;


    @Value("$spring.mail.username")
    private String sender;
    @Override
    public String sendEmail(EmailData emailData)
    {
        try
        {
            SimpleMailMessage obj = new SimpleMailMessage();
            obj.setFrom(sender);
            obj.setTo(emailData.getEmailid());
            obj.setText(emailData.getMessageBody());
            obj.setSubject(emailData.getSubject());
            System.out.println("Inside ConsumerServiceImpl");
            javaMailSender.send(obj);
            return "Success";
        }
        catch (Exception e)
        {
            System.out.println(e);
            return "Fail";
        }
    }

    @Override
    public String recieveEmail(EmailData emailData) {
        return null;
    }
}
