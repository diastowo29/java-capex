package com.example.controller;

import java.util.List;
import java.util.Map;

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
public class RestStorageTankController {

	@Autowired
	private StorageTankRepository storageTankRepo;

	@GetMapping("/storage_tank")
	public List<StorageTank> getAllTank() {
		return storageTankRepo.findAll();
	}

	@PostMapping("/storage_tank/add")
	public StorageTank createTank(@Validated @RequestBody StorageTank tank) {
		return storageTankRepo.save(tank);
	}

	@PostMapping("/storage_tank/update")
	public StorageTank updateTank(@RequestBody Map<String, String> param) {
		long id = Long.valueOf(param.get("id"));
		Double kapasitas = Double.valueOf(param.get("kapasitas"));
		Double diameter = Double.valueOf(param.get("diameter"));
		Double tinggi = Double.valueOf(param.get("tinggi"));
		Double luas = Double.valueOf(param.get("luas"));
		Double harga = Double.valueOf(param.get("harga"));

		StorageTank stank = storageTankRepo.findById(id).orElse(new StorageTank());
		stank.setKapasitas(kapasitas);
		stank.setDiameter(diameter);
		stank.setTinggi(tinggi);
		stank.setLuas(luas);
		stank.setHarga(harga);
		return storageTankRepo.save(stank);
	}
}
