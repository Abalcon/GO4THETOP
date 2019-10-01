package com.stulti.go4thetop;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContenderRepository extends JpaRepository<Contender, Long>
{
    List<Contender> findByMail(@Param("mail") String mail);

    List<Contender> findByCardName(@Param("cardName") String cardName);
}
