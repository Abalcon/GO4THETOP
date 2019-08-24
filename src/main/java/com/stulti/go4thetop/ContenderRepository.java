package com.stulti.go4thetop;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContenderRepository extends JpaRepository<Contender, Long>
{
    public List<Contender> findByMail(@Param("mail") String mail);

    public List<Contender> findByCardName(@Param("cardName") String cardName);
}
