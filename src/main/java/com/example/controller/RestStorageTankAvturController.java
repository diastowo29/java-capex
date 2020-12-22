package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.StorageTankAvtur;
import com.example.repository.StorageTankAvturRepository;

@RestController
@RequestMapping("/api/v1")
public class RestStorageTankAvturController {

	@Autowired
	private StorageTankAvturRepository storageTankAvturRepo;

	@GetMapping("/storage_tank_avtur")
	public List<StorageTankAvtur> getAllTank() {
		return storageTankAvturRepo.findAll();
	}

	@PostMapping("/storage_tank_avtur/add")
	public StorageTankAvtur createTank(@Validated @RequestBody StorageTankAvtur tank) {
		return storageTankAvturRepo.save(tank);
	}
}
