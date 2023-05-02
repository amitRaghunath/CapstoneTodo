package com.example.MailService.Service;

import com.example.MailService.Domain.EmailData;
import org.springframework.stereotype.Service;

@Service
public interface ConsumerService
{
    public String sendEmail(EmailData emailData);
    public String recieveEmail(EmailData emailData);
}
