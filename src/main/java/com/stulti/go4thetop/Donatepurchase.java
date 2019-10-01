package com.stulti.go4thetop;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Donatepurchase {

    private @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @Column(nullable = false)
    private String division;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String email;
    private String address;
    @Column(nullable = false)
    private String senderName;
    @Column(nullable = false)
    private String sendType;
    @Column(columnDefinition = "number(4)")
    private Integer accountNumber;
    // 후원 전용
    private Boolean getReward;
    @Column(length = 512)
    private String rewardRequest;
    // 구매 전용
    private String shirtSize;
    private Integer shirtAmount;

    private Donatepurchase() {
    }

    public Donatepurchase(String division, String name, String email, String address, String senderName, String sendType,
                          Integer accountNumber, Boolean getReward, String rewardRequest, String shirtSize, Integer shirtAmount) {
        super();
        this.division = division;
        this.name = name;
        this.email = email;
        this.address = address;
        this.senderName = senderName;
        this.sendType = sendType;
        this.accountNumber = accountNumber;
        this.getReward = getReward;
        this.rewardRequest = rewardRequest;
        this.shirtSize = shirtSize;
        this.shirtAmount = shirtAmount;
    }
}
