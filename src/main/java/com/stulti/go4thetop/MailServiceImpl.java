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

    private final String registerConfirmSubject = "GO4THETOP 예선 참가 신청 완료 안내";
    private final String donateConfirmSubject = "GO4THETOP 후원 신청 완료 안내";
    private final String purchaseConfirmSubject = "GO4THETOP 구매 신청 완료 안내";

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

    public void sendDonateConfirmMail(Donatepurchase dp) {
        try {
            MimeMessage message = this.mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(dp.getEmail());
            helper.setSubject(donateConfirmSubject);
            helper.setText(MailContentTemplates.donateConfirmMailContent(
                    dp.getName(), dp.getSenderName(), dp.getSendType(), dp.getAccountNumber(),
                    dp.getGetReward(), dp.getRewardRequest(), dp.getAddress()), true);
            this.mailSender.send(message);
        } catch (MailException ex) {
            System.out.println("메일을 보내는 중에 오류가 발생했습니다.");
            //ex.printStackTrace();
        } catch (MessagingException ex) {
            System.out.println("메일을 보내는 중에 오류가 발생했습니다!");
        }
    }

    public void sendPurchaseConfirmMail(Donatepurchase dp) {
        try {
            MimeMessage message = this.mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(dp.getEmail());
            helper.setSubject(purchaseConfirmSubject);
            helper.setText(MailContentTemplates.purchaseConfirmMailContent(
                    dp.getName(), dp.getSenderName(), dp.getSendType(), dp.getAccountNumber(),
                    dp.getShirtSize(), dp.getShirtAmount(), dp.getAddress()), true);
            this.mailSender.send(message);
        } catch (MailException ex) {
            System.out.println("메일을 보내는 중에 오류가 발생했습니다.");
            //ex.printStackTrace();
        } catch (MessagingException ex) {
            System.out.println("메일을 보내는 중에 오류가 발생했습니다!");
        }
    }
}
