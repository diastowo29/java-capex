package com.example.controller;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Jetty4Formula;
import com.example.repository.Jetty4FormulaRepository;

@RestController
@RequestMapping("/api/v1")
public class RestJetty4FormulaController {

	@Autowired
	Jetty4FormulaRepository jetty4FormulaRepo;

	@GetMapping("/jetty_4")
	public List<Jetty4Formula> getAllJetty() {
		return jetty4FormulaRepo.findAll();
	}

	@PostMapping("/jetty_4/add")
	public Jetty4Formula createJetty(@Validated @RequestBody Jetty4Formula jetty) {
		return jetty4FormulaRepo.save(jetty);
	}

	@PostMapping("/jetty_4/calculate")
	public List<Jetty4Formula> getCalculateJetty(@RequestBody Map<String, String> param) {
		String mooringName = param.get("mooring");
		String breastingName = param.get("breasting");
		String trestleName = param.get("trestle");
		String catwalkLength = param.get("catwalk");
		String headName = param.get("head");
		long kurs = Long.valueOf(param.get("kurs"));
		
		List<Jetty4Formula> jetty4s = jetty4FormulaRepo.findAll();
		
		List<Jetty4Formula> newJetty4s = new ArrayList<Jetty4Formula>();

		for (Jetty4Formula jetty4 : jetty4s) {
			if (jetty4.getName().contains("HEAD")) {
				String[] nameSplit = jetty4.getName().split("_");
				if (nameSplit[1].equals(headName)) {
					jetty4.setName("Jetty Head - " + nameSplit[1]);
					newJetty4s.add(jetty4);
				}
			} else if (jetty4.getName().contains("MOORING")) {
				String[] nameSplit = jetty4.getName().split("_");
				if (nameSplit[1].equals(mooringName)) {
					jetty4.setName("Mooring Dolphin - " + nameSplit[1]);
					newJetty4s.add(jetty4);
				}
			} else if (jetty4.getName().contains("BREASTING")) {
				String[] nameSplit = jetty4.getName().split("_");
				if (nameSplit[1].equals(breastingName)) {
					jetty4.setName("Breasting Dolphin - " + nameSplit[1]);
					newJetty4s.add(jetty4);
				}
			} else if (jetty4.getName().contains("TRESTLE")) {
				System.out.println(jetty4.getName());
				String[] nameSplit = jetty4.getName().split("_");
				if (nameSplit[1].equals(trestleName)) {
					jetty4.setName(nameSplit[1]);
					newJetty4s.add(jetty4);
				}
			} else {
				newJetty4s.add(jetty4);
			}
		}
		
		for (Jetty4Formula newJetty4 : newJetty4s) {
			if (newJetty4.getPrice_idr() == null) {
				if (newJetty4.getPrice_formula().contains("PANJANG")) {
					newJetty4.setPrice_formula(newJetty4.getPrice_formula().replace("PANJANG", catwalkLength));
				}
				newJetty4.setPrice_idr(doCalculation(newJetty4.getPrice_formula(), kurs));
			}
		}

		return newJetty4s;
	}


	public double doCalculation(String mathString, long kurs) {
		ScriptEngineManager mgr = new ScriptEngineManager();
		ScriptEngine engine = mgr.getEngineByName("JavaScript");
		String mathReplace = "";
		DecimalFormat df = new DecimalFormat("###.#####");
		if (mathString.contains("KURS")) {
			mathReplace = mathString.replace("KURS", String.valueOf(kurs)).replace(",", ".");
		} else {
			mathReplace = mathString;
		}
		String math = mathReplace.replaceAll(",", ".");
		double newLong = 0;
		try {
			Object result = engine.eval(math);
			BigDecimal bd = new BigDecimal(result.toString());
			newLong = Double.valueOf(result.toString());
		} catch (ScriptException e) {
			// TODO Auto-generated catch block
			newLong = 0;
			e.printStackTrace();
		}
		return newLong;
	}
}
