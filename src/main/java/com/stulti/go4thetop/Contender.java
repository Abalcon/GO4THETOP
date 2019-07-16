package com.stulti.go4thetop;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Contender {

    private @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    private String mail;
    private String fullName;
    private String howtoRead;
    private String cardName;
    private Boolean upper;
    private Boolean lower;
    @Column(nullable = false, columnDefinition = "number(5) default 0")
    private Integer upperTrack1 = 0;
    @Column(nullable = false, columnDefinition = "number(5) default 0")
    private Integer upperTrack2 = 0;
    @Column(nullable = false, columnDefinition = "number(5) default 0")
    private Integer upperTotal = 0;
    @Column(nullable = false, columnDefinition = "number(5) default 0")
    private Integer lowerTrack1 = 0;
    @Column(nullable = false, columnDefinition = "number(5) default 0")
    private Integer lowerTrack2 = 0;
    @Column(nullable = false, columnDefinition = "number(5) default 0")
    private Integer lowerTotal = 0;
    private String sns;
    // 2019.07.16: 신청 시작 직전 형식 확정
    private Boolean watching;
    @Column(length = 1024)
    private String comments;

    private Contender() {}

    public Contender(String mail, String fullName, String howtoRead, String cardName, String sns,
                     Boolean isUpper, Boolean isLower, Boolean isWatching, String comments) {
        super();
        this.mail = mail;
        this.fullName = fullName;
        this.howtoRead = howtoRead;
        this.cardName = cardName;
        this.upper = isUpper;
        this.lower = isLower;
        this.sns = sns;
        this.watching = isWatching;
        this.comments = comments;
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
