package com.stulti.go4thetop;

public class MailContentTemplates {

    public static String entryConfirmMailContent(String fullName, String cardName) {
        return ("<!doctype html>\n" +
                "<html>\n" +
                "<head>\n" +
                "<meta charset='utf-8'>\n" +
                "</head>\n" +
                "<body>\n" +
                "<h3>" + fullName + "(" + cardName + ")님 감사합니다. 참가 신청이 완료되었습니다!</h3>\n" +
                "<p>이번 대회 참여에 진심으로 감사드립니다.<br />\n" +
                "본선 룰은 홈페이지에 게시 예정입니다. 예선은 8월 14일 시작 예정이며, 최종 결정시 홈페이지에 안내해드리겠습니다.<br />\n" +
                "본선이 진행되는 부천 어택의 장소는 아래에 있습니다.</p>\n\n" +

                "<p>어택 (ATTACK)<br />\n" +
                "경기도 부천시 원미구 심곡동 부일로469번길 28<br />\n" +
                "<a href='https://goo.gl/maps/ukgwJMSQc75bzifD6'>구글 지도</a></p>\n\n" +

                "<p>모든 문의사항과 변경사항등은 아래 연락처로 문의하시기 바랍니다.<br />\n" +
                "e-mail: <a href='mailto:989990gfc@gmail.com'>989990gfc@gmail.com</a><br />\n" +
                "트위터: <a href='https://twitter.com/intent/tweet?screen_name=go4thetop&ref_src=twsrc%5Etfw'" +
                " class='twitter-mention-button' data-show-count='false'>Tweet to @go4thetop</a>" +
                "<script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></p>\n\n" +

                "<p>감사합니다.<br />\n" + "잘 부탁드립니다.</p>\n" + "<p><b>주최 RUSE.</b></p><br/><br/>\n\n" +

                "<h3>" + fullName + "(" + cardName + "), Your entry has successfully submitted!</h3>\n" +
                "<p>Thank you very much for participating in this competition.<br />\n" +
                "The rules for the event will be posted on the website.<br />\n" +
                "The preliminary round is scheduled to begin on August 14th," +
                " and we'll let you know on our website when we make a final decision.<br />\n" +
                "I'll attach the location of the Bucheon Attack where the main competition is taking place at the link below.</p>\n\n" +

                "<p>ATTACK (어택)<br />\n" +
                "Buil-ro 469beon-gil 28, Bucheon-si, Gyeonggi-do, South Korea<br />\n" +
                "<a href='https://goo.gl/maps/ukgwJMSQc75bzifD6'>Google Maps</a></p>\n\n" +

                "<p>If you have questions or need to change information, please contact to:<br />\n" +
                "e-mail: <a href='mailto:989990gfc@gmail.com'>989990gfc@gmail.com</a><br />\n" +
                "Twitter: <a href='https://twitter.com/intent/tweet?screen_name=go4thetop&ref_src=twsrc%5Etfw'" +
                " class='twitter-mention-button' data-show-count='false'>Tweet to @go4thetop</a>" +
                "<script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></p>\n\n" +

                "<p>Thank you.<br />\n" +
                "I look forward to your kind cooperation.</p>\n" +
                "<p><strong>Host RUSE.</strong></p>\n" +
                "</body>\n" +
                "</html>");
    }

}
