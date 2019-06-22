package com.stulti.go4thetop;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Contender {

    private @Id @GeneratedValue Long id;
    private String firstName;
    private String lastName;
    private String description;

    private Contender() {}

    public Contender(String firstName, String lastName, String description) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.description = description;
    }
}
