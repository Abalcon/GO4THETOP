package com.stulti.go4thetop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class MailServiceImpl implements MailService {

    //    private JavaMailSender mailSender;
//
//    public void setMailSender(JavaMailSender mailSender) {
//        this.mailSender = mailSender;
//    }
    @Autowired
    public JavaMailSender mailSender;

    private String registerConfirmSubject = "예선 참가 신청 완료 안내";
    private String registerConfirmContent = "님, GO4THETOP 예선에 참가해주셔서 감사합니다!";

    /* References
    https://support.google.com/mail/answer/7104828?hl=en
    */
    public void sendRegistConfirmMail(Contender contender) {
        //JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        //this.mailSender.setHost("smtp.gmail.com");
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(contender.getMail());
            mailMessage.setFrom("extinbase@gmail.com"); //TODO: 대회용 메일 주소로 바꾸기
            mailMessage.setSubject(registerConfirmSubject);
            mailMessage.setText(contender.getFullName() + "(" + contender.getCardName() + ")" + registerConfirmContent);
            this.mailSender.send(mailMessage);
        } catch (MailException ex) {
            ex.printStackTrace();
        }
    }
}
