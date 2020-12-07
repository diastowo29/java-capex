package com.example.controller;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.DepotLpg;
import com.example.model.StorageTank;
import com.example.model.TerminalBbm;
import com.example.repository.DepotLpgRepository;
import com.example.repository.StorageTankRepository;
import com.example.repository.TbbmRepository;

@RestController
@RequestMapping("/api/v1")
public class MyRestController {

	@Autowired
	private StorageTankRepository storageTankRepo;
	@Autowired
	private DepotLpgRepository depotRepository;
	@Autowired
	private TbbmRepository tbbmRepository;

	@GetMapping("/gettank")
	public List<StorageTank> getAllTank() {
		return storageTankRepo.findAll();
	}

	@PostMapping("/tank")
	public StorageTank createEmployee(@Validated @RequestBody StorageTank tank) {
		return storageTankRepo.save(tank);
	}

	@PostMapping("/depot/add")
	public DepotLpg createDepot(@Validated @RequestBody DepotLpg depot) {
		return depotRepository.save(depot);
	}

	@PostMapping("/tbbm/add")
	public TerminalBbm createTbbm(@Validated @RequestBody TerminalBbm tbbm) {
		return tbbmRepository.save(tbbm);
	}

	@GetMapping("/tbbm/all")
	public List<TerminalBbm> getAllTbbm() {
		return tbbmRepository.findAll();
	}

	@GetMapping("/depot/{cap}")
	public List<DepotLpg> findDepotbyCap(@PathVariable(value = "cap") Long depotCap) {
		System.out.println(depotCap);
		return depotRepository.findByCapOrderByPositionAsc(depotCap);
	}

	@GetMapping("/testing")
	public Map<String, String> testing() {
		String test = "";
		ScriptEngineManager mgr = new ScriptEngineManager();
		ScriptEngine engine = mgr.getEngineByName("JavaScript");

		String foo = "2521063.82978723*14900*(2000/1500)^0.6";
		if (foo.contains("^")) {
			String[] squared = foo.split("^");
		}
		try {
			System.out.println(engine.eval(foo));
			System.out.println(Math.pow(Double.valueOf(engine.eval(foo).toString()), 0.6));
			test = String.valueOf(BigDecimal.valueOf(Double.valueOf(engine.eval(foo).toString())));
		} catch (ScriptException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		HashMap<String, String> map = new HashMap<>();
		map.put("key", test);
		return map;
	}
}
