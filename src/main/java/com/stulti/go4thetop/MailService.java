package com.stulti.go4thetop;

public interface MailService {

    void sendRegistConfirmMail(Contender contender);

    void sendDonateConfirmMail(Donatepurchase dp);

    void sendPurchaseConfirmMail(Donatepurchase dp);
}