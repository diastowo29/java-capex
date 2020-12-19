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

import com.example.model.Inflasi;
import com.example.model.JettyTrestleTypeFormula;
import com.example.repository.InflasiRepository;
import com.example.repository.JettyTrestleTypeFormulaRepository;

@RestController
@RequestMapping("/api/v1")
public class RestJettyTrestleTypeController {

	@Autowired
	JettyTrestleTypeFormulaRepository jettyTrestleRepo;

	@Autowired
	InflasiRepository inflasiRepo;

	@GetMapping("/jetty_trestle")
	public List<JettyTrestleTypeFormula> getAllJetty() {
		return jettyTrestleRepo.findAll();
	}

	@GetMapping("/jetty_trestle/{kurs}")
	public List<JettyTrestleTypeFormula> findJettyCalc(@PathVariable(value = "kurs") Long kurs) {
		List<JettyTrestleTypeFormula> jettys = jettyTrestleRepo.findAll();
		List<Inflasi> inflasis = inflasiRepo.findAll();
		for (JettyTrestleTypeFormula jettyFormula : jettys) {
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

	@PostMapping("/jetty_trestle/add")
	public JettyTrestleTypeFormula createJetty(@Validated @RequestBody JettyTrestleTypeFormula jetty) {
		return jettyTrestleRepo.save(jetty);
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
