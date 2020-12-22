package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.JettyHeadTypeFormula;
import com.example.repository.JettyHeadTypeFormulaRepository;

@RestController
@RequestMapping("/api/v1")
public class RestJettyHeadTypeController {

	@Autowired
	JettyHeadTypeFormulaRepository jettyHeadRepo;

	@GetMapping("/jetty_head")
	public List<JettyHeadTypeFormula> getAllJetty() {
		return jettyHeadRepo.findAll();
	}

	@PostMapping("/jetty_head/add")
	public JettyHeadTypeFormula createJetty(@Validated @RequestBody JettyHeadTypeFormula jetty) {
		return jettyHeadRepo.save(jetty);
	}
}
