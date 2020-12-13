package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.DepotLPGFormula;

public interface DepotLPGFormulaRepository extends JpaRepository<DepotLPGFormula, Long> {

	List<DepotLPGFormula> findByCapOrderByPositionAsc(Long cap);
}
