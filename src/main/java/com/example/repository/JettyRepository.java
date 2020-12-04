package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.Jetty;

@Repository
public interface JettyRepository extends JpaRepository<Jetty, Long> {

}
