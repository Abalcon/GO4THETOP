package com.stulti.go4thetop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class MailServiceImpl implements MailService {

    //    private JavaMailSender mailSender;
//
//    public void setMailSender(JavaMailSender mailSender) {
//        this.mailSender = mailSender;
//    }

    @Autowired
    public JavaMailSender mailSender;

    private String registerConfirmSubject = "GO4THETOP 예선 참가 신청 완료 안내";

    /* References
    https://support.google.com/mail/answer/7104828?hl=en
    */
    public void sendRegistConfirmMail(Contender contender) {

        try {
            MimeMessage message = this.mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(contender.getMail());
            helper.setSubject(registerConfirmSubject);
            helper.setText(MailContentTemplates.entryConfirmMailContent(contender.getFullName(), contender.getCardName()), true);
            this.mailSender.send(message);
        } catch (MailException ex) {
            System.out.println("메일을 보내는 중에 오류가 발생했습니다.");
            //ex.printStackTrace();
        } catch (MessagingException ex) {
            System.out.println("메일을 보내는 중에 오류가 발생했습니다!");
        }

    }
}
