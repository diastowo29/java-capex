package com.example.controller;

import java.math.BigDecimal;
import java.text.DecimalFormat;
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

import com.example.model.DepotLPGFormula;
import com.example.model.Inflasi;
import com.example.model.TBBMFormula;
import com.example.repository.InflasiRepository;
import com.example.repository.TBBMFormulaRepository;

@RestController
@RequestMapping("/api/v1")
public class RestTbbmController {
	@Autowired
	TBBMFormulaRepository tbbmFormulaRepo;

	@Autowired
	InflasiRepository inflasiRepo;

	@PostMapping("/tbbm/add")
	public TBBMFormula createTbbm(@Validated @RequestBody TBBMFormula tbbm) {
		return tbbmFormulaRepo.save(tbbm);
	}

	@GetMapping("/tbbm")
	public List<TBBMFormula> getAllTbbm() {
		return tbbmFormulaRepo.findAll();
	}

	@GetMapping("/tbbm/{cap}/{kurs}")
	public List<TBBMFormula> findDepotbyCap(@PathVariable(value = "cap") Long tbbmCap,
			@PathVariable(value = "kurs") Long kurs) {
		List<TBBMFormula> tbbms = tbbmFormulaRepo.findByCapOrderByPositionAsc(tbbmCap);
		List<Inflasi> inflasis = inflasiRepo.findAll();
		for (TBBMFormula tbbmFormula : tbbms) {
			if (tbbmFormula.getPrice_idr() == null) {
				for (Inflasi inflasi : inflasis) {
					if (tbbmFormula.getPrice_formula().contains("INFLASI_" + inflasi.getTahun())) {
						tbbmFormula.setPrice_formula(tbbmFormula.getPrice_formula()
								.replace("INFLASI_" + inflasi.getTahun(), String.valueOf(inflasi.getInflasi() / 100)));
					}
				}
				tbbmFormula.setPrice_idr(doCalculation(tbbmFormula.getPrice_formula(), kurs));
			}
		}
		return tbbms;
	}

	@PostMapping("/tbbm/update")
	public TBBMFormula updateTank(@RequestBody Map<String, String> param) {
		long id = Long.valueOf(param.get("id"));
		Double price_idr = null;
		String name = param.get("name").toString();
		if (!param.get("price_idr").toString().isEmpty()) {			
			price_idr = Double.valueOf(param.get("price_idr").toString());
		}
		String price_formula = param.get("price_formula").toString();
		String remarks = param.get("remarks").toString();
		String satuan = param.get("satuan").toString();
		long qty = Long.valueOf(param.get("qty").toString());

		TBBMFormula jetty = tbbmFormulaRepo.findById(id).orElse(new TBBMFormula());
		jetty.setName(name);
		if (!param.get("price_idr").toString().isEmpty()) {			
			jetty.setPrice_idr(price_idr);
		}
		jetty.setPrice_formula(price_formula);
		jetty.setRemarks(remarks);
		jetty.setSatuan(satuan);
		jetty.setQty(qty);
		return tbbmFormulaRepo.save(jetty);
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
