package com.stulti.go4thetop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@Controller
public class HomeController {

    private ContenderRepository ctdRepo;
    private static HttpServerErrorException exception;

    @Autowired
    public HomeController(ContenderRepository repository) {
        this.ctdRepo = repository;
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
        Form을 이용한 제출을 사용하면 @RequestBody로 인식하지 못한다고 한다
        @RequestBody를 제대로 적용하려면, Body를 Application/json 형태로 보내야 한다
        */
        ctdRepo.save(ctd);
        return ctd;
    }
}
