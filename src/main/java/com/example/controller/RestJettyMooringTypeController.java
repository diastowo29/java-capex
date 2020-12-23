package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.JettyMooringTypeFormula;
import com.example.repository.JettyMooringTypeFormulaRepository;

@RestController
@RequestMapping("/api/v1")
public class RestJettyMooringTypeController {

	@Autowired
	JettyMooringTypeFormulaRepository jettyMooringRepo;

	@GetMapping("/jetty_mooring")
	public List<JettyMooringTypeFormula> getAllJetty() {
		return jettyMooringRepo.findAll();
	}

	@PostMapping("/jetty_mooring/add")
	public JettyMooringTypeFormula createJetty(@Validated @RequestBody JettyMooringTypeFormula jetty) {
		return jettyMooringRepo.save(jetty);
	}
}
