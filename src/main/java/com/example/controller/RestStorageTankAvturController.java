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

	@PostMapping("/storage_tank_avtur/update")
	public StorageTankAvtur updateTank(@RequestBody Map<String, String> param) {
		long id = Long.valueOf(param.get("id"));
		Double kapasitas = Double.valueOf(param.get("kapasitas"));
		Double diameter = Double.valueOf(param.get("diameter"));
		Double tinggi = Double.valueOf(param.get("tinggi"));
		Double luas = Double.valueOf(param.get("luas"));
		Double harga = Double.valueOf(param.get("harga"));
		Double hargaInternalCoating = Double.valueOf(param.get("hargaInternalCoating"));
		Double hargaFloatingSuction = Double.valueOf(param.get("hargaFloatingSuction"));

		StorageTankAvtur stank = storageTankAvturRepo.findById(id).orElse(new StorageTankAvtur());
		stank.setKapasitas(kapasitas);
		stank.setDiameter(diameter);
		stank.setTinggi(tinggi);
		stank.setLuas(luas);
		stank.setHarga(harga);
		stank.setHargaInternalCoating(hargaInternalCoating);
		stank.setHargaFloatingSuction(hargaFloatingSuction);
		return storageTankAvturRepo.save(stank);
	}
}
