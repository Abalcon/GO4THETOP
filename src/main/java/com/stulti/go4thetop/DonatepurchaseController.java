package com.stulti.go4thetop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "https://www.go4thetop.net"}, maxAge = 3600)
@Controller
public class DonatepurchaseController {

    private final DonatepurchaseRepository ctdRepo;
    private final MailService mailService;

    @Autowired
    public DonatepurchaseController(DonatepurchaseRepository repository, MailService mailService) {
        this.ctdRepo = repository;
        this.mailService = mailService;
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Invalid Division")
    private class InvalidDivisionException extends RuntimeException {

    }

    @RequestMapping(value = "/donates")
    public @ResponseBody
    List<Donatepurchase> getDonates() {
        return ctdRepo.findByDivision("donate");
    }

    @RequestMapping(value = "/purchases")
    public @ResponseBody
    List<Donatepurchase> getPurchases() {
        return ctdRepo.findByDivision("purchase");
    }

    @RequestMapping(method = RequestMethod.POST, value = "/commitment")
    @ResponseStatus(value = HttpStatus.OK)
    public void addDocument(@RequestBody Donatepurchase dp) {

        if (dp.getDivision().equals("donate")) {
            dp.setShirtSize("");
            dp.setShirtAmount(0);
            Donatepurchase newDonate = ctdRepo.save(dp);
            mailService.sendDonateConfirmMail(newDonate);
        } else if (dp.getDivision().equals("purchase")) {
            dp.setGetReward(false);
            dp.setRewardRequest("");
            Donatepurchase newPurchase = ctdRepo.save(dp);
            mailService.sendPurchaseConfirmMail(newPurchase);
        } else {
            //ctdRepo.delete(newDocument);
            throw new InvalidDivisionException();
        }
    }
}
