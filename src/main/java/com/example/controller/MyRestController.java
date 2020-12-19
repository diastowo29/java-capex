package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.DepotLpg;
import com.example.repository.DepotLpgRepository;

@RestController
@RequestMapping("/api/v1")
public class MyRestController {

	@Autowired
	private DepotLpgRepository depotRepository;

	@PostMapping("/depot/add")
	public DepotLpg createDepot(@Validated @RequestBody DepotLpg depot) {
		return depotRepository.save(depot);
	}

	@GetMapping("/depot/{cap}")
	public List<DepotLpg> findDepotbyCap(@PathVariable(value = "cap") Long depotCap) {
		return depotRepository.findByCapOrderByPositionAsc(depotCap);
	}

//	@GetMapping("/testing")
//	public Map<String, String> testing() {
//		String test = "";
//		ScriptEngineManager mgr = new ScriptEngineManager();
//		ScriptEngine engine = mgr.getEngineByName("JavaScript");
//
//		String foo = "2521063.82978723*14900*(2000/1500)^0.6";
//		if (foo.contains("^")) {
//			String[] squared = foo.split("^");
//		}
//		try {
//			System.out.println(engine.eval(foo));
//			System.out.println(Math.pow(Double.valueOf(engine.eval(foo).toString()), 0.6));
//			test = String.valueOf(BigDecimal.valueOf(Double.valueOf(engine.eval(foo).toString())));
//		} catch (ScriptException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		HashMap<String, String> map = new HashMap<>();
//		map.put("key", test);
//		return map;
//	}
}
