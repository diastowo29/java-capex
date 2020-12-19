package com.example.controller;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.List;

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

import com.example.model.DepotLPGFormula;
import com.example.repository.DepotLPGFormulaRepository;

@RestController
@RequestMapping("/api/v2")
public class RestDepotController {

	@Autowired
	DepotLPGFormulaRepository depotFormulaRepo;

	@PostMapping("/depot/add")
	public DepotLPGFormula createDepot(@Validated @RequestBody DepotLPGFormula depot) {
		return depotFormulaRepo.save(depot);
	}

	@GetMapping("/depot/{cap}/{kurs}")
	public List<DepotLPGFormula> findDepotbyCap(@PathVariable(value = "cap") Long depotCap,
			@PathVariable(value = "kurs") Long kurs) {
		List<DepotLPGFormula> depots = depotFormulaRepo.findByCapOrderByPositionAsc(depotCap);
		for (DepotLPGFormula depotLPGFormula : depots) {
			if (depotLPGFormula.getPrice_idr() == null) {
				depotLPGFormula.setPrice_idr(doCalculation(depotLPGFormula.getPrice_formula(), kurs));
			}
		}
		return depots;
	}

	public double doCalculation(String mathString, long kurs) {
		ScriptEngineManager mgr = new ScriptEngineManager();
		ScriptEngine engine = mgr.getEngineByName("JavaScript");
		String mathReplace = "";
		DecimalFormat df = new DecimalFormat("###");
		if (mathString.contains("KURS")) {
			mathReplace = mathString.replace("KURS", String.valueOf(kurs)).replace(",", ".");
		} else {
			mathReplace = mathString;
		}
		String math = mathReplace.replaceAll(",", ".");
		long newLong = 0;
		try {
			Object result = engine.eval(math);
			BigDecimal bd = new BigDecimal(result.toString());
			long lv = Long.parseLong(df.format(bd));
			newLong = lv;
		} catch (ScriptException e) {
			// TODO Auto-generated catch block
			newLong = 0;
			e.printStackTrace();
		}
		return newLong;
	}

}
