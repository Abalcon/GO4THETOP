package com.stulti.go4thetop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final ContenderRepository contenderRepository;
    private final DonatepurchaseRepository dpRepository;

    @Autowired
    public DatabaseLoader(ContenderRepository repository, DonatepurchaseRepository dpRepository) {
        this.contenderRepository = repository;
        this.dpRepository = dpRepository;
    }

    @Override
    public void run(String... strings) {
//        this.repository.save(new Contender("extinbase@gmail.com",
//                "DJ 스툴티", "Stult_i", false, true, "AutomationCreator"));
        contenderRepository.findAll().forEach(System.out::println);
        dpRepository.findAll().forEach(System.out::println);
    }
}
