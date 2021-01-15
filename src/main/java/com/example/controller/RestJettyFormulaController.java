package com.example.controller;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Inflasi;
import com.example.model.JettyFormula;
import com.example.model.JettyTrestleTypeFormula;
import com.example.model.StorageTank;
import com.example.repository.InflasiRepository;
import com.example.repository.JettyFormulaRepository;
import com.example.repository.JettyTrestleTypeFormulaRepository;
import com.fasterxml.jackson.databind.util.JSONPObject;

@RestController
@RequestMapping("/api/v1")
public class RestJettyFormulaController {

	@Autowired
	JettyFormulaRepository jettyRepo;

	@Autowired
	InflasiRepository inflasiRepo;

	@Autowired
	JettyTrestleTypeFormulaRepository jettyTrestleRepo;

	@GetMapping("/jetty")
	public List<JettyFormula> getAllJetty() {
		return jettyRepo.findAll();
	}
	
	@PostMapping("/jetty/update")
	public JettyFormula updateTank(@RequestBody Map<String, String> param) {
		long id = Long.valueOf(param.get("id"));
		Double price_idr = null;
		String name = param.get("name").toString();
		if (!param.get("price_idr").toString().isEmpty()) {			
			price_idr = Double.valueOf(param.get("price_idr").toString());
		}
		String price_formula = param.get("price_formula").toString();
		String remarks = param.get("remarks").toString();
		String satuan = param.get("satuan").toString();
		String price_tbbm_formula = param.get("price_tbbm_formula").toString();

		JettyFormula jetty = jettyRepo.findById(id).orElse(new JettyFormula());
		jetty.setName(name);
		if (!param.get("price_idr").toString().isEmpty()) {			
			jetty.setPrice_idr(price_idr);
		}
		jetty.setPrice_formula(price_formula);
		jetty.setRemarks(remarks);
		jetty.setSatuan(satuan);
		jetty.setPrice_tbbm_formula(price_tbbm_formula);
		return jettyRepo.save(jetty);
	}
	
	@PostMapping("/jetty")
	public List<JettyFormula> getaJetty (@RequestBody Map<String, String> param) {
		List<JettyFormula> jettyList = new ArrayList<>();
		String nameParam = param.get("name").toString();
		String kursParam = param.get("kurs").toString();
		JettyFormula jetty = jettyRepo.findByName(nameParam);
		List<Inflasi> inflasis = inflasiRepo.findAll();
		if (jetty.getPrice_idr() == null) {
			for (Inflasi inflasi : inflasis) {
				if (jetty.getPrice_formula().contains("INFLASI_" + inflasi.getTahun())) {
					jetty.setPrice_formula(jetty.getPrice_formula()
							.replace("INFLASI_" + inflasi.getTahun(), String.valueOf(inflasi.getInflasi() / 100)));
				}
			}
			jetty.setPrice_idr(doCalculation(jetty.getPrice_formula(), Long.valueOf(kursParam)));
			jetty.setQty(1);
		}
		jettyList.add(jetty);
		return jettyList;
	}

	@GetMapping("/jetty/{kurs}")
	public List<JettyFormula> findJettyCalc(@PathVariable(value = "kurs") Long kurs) {
		List<JettyFormula> jettys = jettyRepo.findAll();
		List<Inflasi> inflasis = inflasiRepo.findAll();
		for (JettyFormula jettyFormula : jettys) {
			if (jettyFormula.getPrice_idr() == null) {
				for (Inflasi inflasi : inflasis) {
					if (jettyFormula.getPrice_formula().contains("INFLASI_" + inflasi.getTahun())) {
						jettyFormula.setPrice_formula(jettyFormula.getPrice_formula()
								.replace("INFLASI_" + inflasi.getTahun(), String.valueOf(inflasi.getInflasi() / 100)));
					}
				}
				jettyFormula.setPrice_idr(doCalculation(jettyFormula.getPrice_formula(), kurs));
			}
		}
		return jettys;
	}

	@GetMapping("/jettytbbm/{kurs}")
	public List<JettyFormula> findJettyTbbmCalc(@PathVariable(value = "kurs") Long kurs,
			@RequestParam (name="panjang") String[] panjang) {
		List<JettyFormula> jettys = jettyRepo.findAll();
		List<Inflasi> inflasis = inflasiRepo.findAll();
		List<JettyTrestleTypeFormula> jettyTrestle = jettyTrestleRepo.findAll();
		for (JettyFormula jettyFormula : jettys) {
			if (jettyFormula.getPrice_idr() == null) {
				if (jettyFormula.getPrice_tbbm_formula() != null) {
					for (Inflasi inflasi : inflasis) {
						if (jettyFormula.getPrice_tbbm_formula().contains("INFLASI_" + inflasi.getTahun())) {
							jettyFormula.setPrice_tbbm_formula(jettyFormula.getPrice_tbbm_formula()
									.replace("INFLASI_" + inflasi.getTahun(), String.valueOf(inflasi.getInflasi() / 100)));
						}
					}
					for (JettyTrestleTypeFormula jettyTrestleTypeFormula : jettyTrestle) {
						if (jettyFormula.getPrice_tbbm_formula()
								.contains("TRESTLE_" + jettyTrestleTypeFormula.getPosition())) {
							jettyFormula.setPrice_tbbm_formula(jettyFormula.getPrice_tbbm_formula().replace(
									"TRESTLE_" + jettyTrestleTypeFormula.getPosition(),
									String.valueOf(doCalculation(jettyTrestleTypeFormula.getPrice_formula(), kurs))));

						}
					}
					JSONObject calcJson = new JSONObject();
					for (String panjangParam : panjang) {
						String newPriceTbbmFormula = jettyFormula.getPrice_tbbm_formula().replace("PANJANG_TRESTLE", panjangParam);
						Double calculationResult = (doCalculation(newPriceTbbmFormula, kurs));
						calcJson.put(panjangParam.toString(), calculationResult);
					}
					jettyFormula.setMulti_price(calcJson.toString());
					System.out.println(calcJson.toString());
					
				}
			}
		}
		return jettys;
	}
	
	@GetMapping("/jettytest/{kurs}")
	public List<JettyFormula> testingTbbmJetty(@PathVariable(value = "kurs") Long kurs,
			@RequestParam (name="panjang") String[] panjang) {
		List<JettyFormula> jettys = jettyRepo.findAll();
		for (String newPanjang : panjang) {
			System.out.println(newPanjang);
		}
		return jettys;
	}

	@PostMapping("/jetty/add")
	public JettyFormula createJetty(@Validated @RequestBody JettyFormula jetty) {
		return jettyRepo.save(jetty);
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
