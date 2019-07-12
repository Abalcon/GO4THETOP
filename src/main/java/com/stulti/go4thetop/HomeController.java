package com.stulti.go4thetop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "https://www.go4thetop.net"}, maxAge = 3600)
@Controller
public class HomeController {

    private ContenderRepository ctdRepo;
    private MailService mailService;

    @Autowired
    public HomeController(ContenderRepository repository, MailService mailService) {
        this.ctdRepo = repository;
        this.mailService = mailService;
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Email is Already Registered.")
    private class EmailAlreadyRegisteredException extends RuntimeException {

    }

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    @RequestMapping(value = "/contenders")
    public @ResponseBody
    List<Contender> contenders() {
        return ctdRepo.findAll();
    }

    @RequestMapping(value = "/entry")
    public @ResponseBody
    List<Contender> getContenders() {
        return ctdRepo.findAll();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/entry")
    public @ResponseBody
    Contender addContender(@RequestBody Contender ctd) {
        /*
        https://stackoverflow.com/questions/33796218/content-type-application-x-www-form-urlencodedcharset-utf-8-not-supported-for
        Form을 이용한 제출(x-www-form-urlencoded)을 사용하면 @RequestBody로 인식하지 못한다고 한다
        @RequestBody를 제대로 적용하려면, Body를 Application/json 형태로 보내야 한다
        */
        if (!ctdRepo.findByMail(ctd.getMail()).isEmpty()) {
            throw new EmailAlreadyRegisteredException();
        }

        Contender newContender = ctdRepo.save(ctd);
        mailService.sendRegistConfirmMail(newContender);
        return ctd;
    }

    @RequestMapping(value = "/entry/search/findByMail")
    public @ResponseBody
    List<Contender> findByMail(String mail) {
        return ctdRepo.findByMail(mail);
    }

}
