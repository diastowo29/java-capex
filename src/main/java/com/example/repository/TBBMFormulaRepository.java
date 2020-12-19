package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.TBBMFormula;

public interface TBBMFormulaRepository extends JpaRepository<TBBMFormula, Long>{

	List<TBBMFormula> findByCapOrderByPositionAsc(Long cap);
}
