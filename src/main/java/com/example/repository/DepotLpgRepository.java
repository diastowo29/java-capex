package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.DepotLpg;

public interface DepotLpgRepository extends JpaRepository<DepotLpg, Long> {
//	@Override
//	default Optional<DepotLpg> findByCap(Long cap) {
//		// TODO Auto-generated method stub
//		return null;
//	}

	List<DepotLpg> findByCapOrderByPositionAsc(Long cap);
}
