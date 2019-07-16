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

    private String registerConfirmSubject = "GO4THETOP 예선 참가 신청 완료 안내";
    private String registerConfirmContent = "님, 참가 신청이 완료되었습니다!\n" +
            "이번 대회 참여에 진심으로 감사드립니다.\n" +
            "본선 룰은 홈페이지에 게시 예정입니다. 예선은 8월 14일 시작 예정이며, 최종 결정시 홈페이지에 안내해드리겠습니다.\n" +
            "본선이 진행되는 부천 어택의 장소는 아래 링크에 첨부하겠습니다.\n\n" +
            "어텍 (ATTACK)\n" +
            "경기도 부천시 원미구 심곡동 부일로469번길 28\n" +
            "https://goo.gl/maps/ukgwJMSQc75bzifD6\n\n" +
            "모든 문의사항과 변경사항등은\n" +
            "e-mail:989990gfc@gmail.com\n" +
            "Twitter:@go4thetop 으로 연락 부탁드립니다.\n\n" +
            "감사합니다.\n" +
            "잘 부탁드립니다. \n" +
            "주최 RUSE.";
    private String registerConfirmContentEnglish = "Your entry is complete!\n" +
            "Thank you very much for participating in this competition.\n" +
            "The rules for the event will be posted on the website. The preliminary round is scheduled to begin on August 14th," +
            " and we'll let you know on our website when we make a final decision.\n" +
            "I'll attach the location of the Bucheon Attack where the main competition is taking place at the link below.\n\n" +
            "https://goo.gl/maps/ukgwJMSQc75bzifD6\n\n" +
            "All questions and changes, etc.\n" +
            "e-mail:989990gfc@gmail.com\n" +
            "Twitter:@go4etop, please.\n\n" +
            "Thank you.\n" +
            "I look forward to your kind cooperation.\n" +
            "Host RUSE.";

    /* References
    https://support.google.com/mail/answer/7104828?hl=en
    */
    public void sendRegistConfirmMail(Contender contender) {
        //JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        //this.mailSender.setHost("smtp.gmail.com");
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(contender.getMail());
            mailMessage.setFrom("989990gfc@gmail.com");
            mailMessage.setSubject(registerConfirmSubject);
            mailMessage.setText(contender.getFullName() + "(" + contender.getCardName() + ")"
                    + registerConfirmContent + "\n\n\n" + registerConfirmContentEnglish);
            this.mailSender.send(mailMessage);
        } catch (MailException ex) {
            ex.printStackTrace();
        }
    }
}
