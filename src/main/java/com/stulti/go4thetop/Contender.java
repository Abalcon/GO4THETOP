package com.stulti.go4thetop;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class Contender {

    private @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    private String mail;
    private String fullName;
    private String cardName;
    private Boolean upper;
    private Boolean lower;
    private Integer upperTrack1;
    private Integer upperTrack2;
    private Integer lowerTrack1;
    private Integer lowerTrack2;
    private String sns;

    private Contender() {}

    public Contender(String mail, String fullName, String cardName, Boolean isUpper, Boolean isLower, String sns) {
        super();
        this.mail = mail;
        this.fullName = fullName;
        this.cardName = cardName;
        this.upper = isUpper;
        this.lower = isLower;
        this.sns = sns;
    }

    /*
    # Two Videos are considered equal if they have exactly the same values for
    # their name, url, and duration.
    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Video) {
            Video other = (Video) obj;

            return Objects.equal(name, other.name)
                    && Objects.equal(url, other.url)
                    && duration == other.duration;
        } else {
            return false;
        }
    }
    */
}
