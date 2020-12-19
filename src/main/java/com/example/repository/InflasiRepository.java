package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Inflasi;

public interface InflasiRepository extends JpaRepository<Inflasi, Long> {

	Inflasi findByTahun(int tahun);
}
