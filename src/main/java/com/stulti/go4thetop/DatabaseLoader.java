package com.stulti.go4thetop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final ContenderRepository repository;

    @Autowired
    public DatabaseLoader(ContenderRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
//        this.repository.save(new Contender("extinbase@gmail.com",
//                "DJ 스툴티", "Stult_i", false, true, "AutomationCreator"));
        repository.findAll().forEach(System.out::println);
    }
}
