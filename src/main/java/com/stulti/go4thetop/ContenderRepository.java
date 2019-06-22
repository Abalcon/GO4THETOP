package com.stulti.go4thetop;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContenderRepository extends JpaRepository<Contender, Long>
{

}
