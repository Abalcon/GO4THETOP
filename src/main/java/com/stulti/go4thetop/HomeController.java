package com.stulti.go4thetop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class HomeController {

    private ContenderRepository ctdRepo;

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
}
