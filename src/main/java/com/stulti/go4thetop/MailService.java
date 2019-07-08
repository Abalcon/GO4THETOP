package com.stulti.go4thetop;

import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;

public class MailService {

    private MailSender mailSender;

    public void setMailSender(MailSender mailSender) {
        this.mailSender = mailSender;
    }

    private String registerConfirmSubject = "예선 참가 신청 완료 안내";
    private String registerConfirmContent = "님, GO4THETOP 예선에 참가해주셔서 감사합니다!";

    /* References
    https://support.google.com/mail/answer/7104828?hl=en
    */
    protected void sendRegistConfirmMail(Contender contender) {
        //JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        //this.mailSender.setHost("smtp.gmail.com");

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(contender.getMail());
        mailMessage.setFrom(""); //TODO: 대회용 메일 주소
        mailMessage.setSubject(registerConfirmSubject);
        mailMessage.setText(contender.getFullName() + "(" + contender.getCardName() + ")" + registerConfirmContent);
        this.mailSender.send(mailMessage);
    }
}
