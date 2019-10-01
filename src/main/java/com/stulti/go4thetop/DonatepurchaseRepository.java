package com.stulti.go4thetop;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DonatepurchaseRepository extends JpaRepository<Donatepurchase, Long> {
    List<Donatepurchase> findByDivision(@Param("division") String division);
}
