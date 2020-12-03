package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.StorageTank;
import com.example.repository.StorageTankRepository;

@RestController
@RequestMapping("/api/v1")
public class MyRestController {

	@Autowired
	private StorageTankRepository storageTankRepo;

	@GetMapping("/gettank")
	public List<StorageTank> getAllTank() {
		return storageTankRepo.findAll();
	}

	@PostMapping("/tank")
	public StorageTank createEmployee(@Validated @RequestBody StorageTank tank) {
		return storageTankRepo.save(tank);
	}
}
