package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.DPPUFormula;

public interface DPPUFormulaRepository extends JpaRepository<DPPUFormula, Long> {

	List<DPPUFormula> findByCapOrderByPositionAsc(Long cap);
}
