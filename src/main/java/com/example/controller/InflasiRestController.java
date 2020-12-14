package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Inflasi;
import com.example.repository.InflasiRepository;

@RestController
@RequestMapping("/api/v2")
public class InflasiRestController {

	@Autowired
	InflasiRepository inflasiRepo;

	@PostMapping("/inflasi/add")
	public Inflasi createDepot(@Validated @RequestBody Inflasi inflasi) {
		return inflasiRepo.save(inflasi);
	}

}
