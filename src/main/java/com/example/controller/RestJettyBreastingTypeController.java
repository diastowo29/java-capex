package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.JettyBreastingTypeFormula;
import com.example.repository.JettyBreastingTypeFormulaRepository;

@RestController
@RequestMapping("/api/v1")
public class RestJettyBreastingTypeController {

	@Autowired
	JettyBreastingTypeFormulaRepository jettyBreastingRepo;

	@GetMapping("/jetty_breasting")
	public List<JettyBreastingTypeFormula> getAllJetty() {
		return jettyBreastingRepo.findAll();
	}

	@PostMapping("/jetty_breasting/add")
	public JettyBreastingTypeFormula createJetty(@Validated @RequestBody JettyBreastingTypeFormula jetty) {
		return jettyBreastingRepo.save(jetty);
	}
}
