package com.example.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Inflasi;
import com.example.repository.InflasiRepository;

@RestController
@RequestMapping("/api/v1")
public class RestInflasiController {

	@Autowired
	private InflasiRepository inflasiRepo;

	@GetMapping("/inflasi")
	public List<Inflasi> getAllInflasi() {
		return inflasiRepo.findAll();
	}

	@PostMapping("/inflasi/add")
	public Inflasi createInflasi(@Validated @RequestBody Inflasi inflasi) {
		return inflasiRepo.save(inflasi);
	}

	@GetMapping("/inflasi/{tahun}")
	public Inflasi getInflasi(@PathVariable(value = "tahun") int tahun) {
		return inflasiRepo.findByTahun(tahun);
	}

	@PostMapping("/inflasi/update")
	public Inflasi updateTank(@RequestBody Map<String, String> param) {
		long id = Long.valueOf(param.get("id"));
		int tahun = Integer.valueOf(param.get("tahun"));
		Double inflasi = Double.valueOf(param.get("inflasi"));

		Inflasi thisInflasi = inflasiRepo.findById(id).orElse(new Inflasi());
		thisInflasi.setTahun(tahun);
		thisInflasi.setInflasi(inflasi);
		return inflasiRepo.save(thisInflasi);
	}
}
