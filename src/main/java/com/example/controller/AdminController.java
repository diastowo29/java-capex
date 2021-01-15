package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.model.DepotLPGFormula;
import com.example.model.JettyFormula;
import com.example.model.StorageTank;
import com.example.model.StorageTankAvtur;
import com.example.repository.DepotLPGFormulaRepository;
import com.example.repository.JettyFormulaRepository;
import com.example.repository.StorageTankAvturRepository;
import com.example.repository.StorageTankRepository;

@Controller
@SpringBootApplication
public class AdminController {

	@Autowired
	StorageTankRepository stankRepo;
	@Autowired
	StorageTankAvturRepository stankAvturRepo;
	@Autowired
	JettyFormulaRepository jettyRepo;
	@Autowired
	DepotLPGFormulaRepository depotRepo;

	@RequestMapping("/admin")
	String loadAdminPage() {
		return "redirect:/stank";
	}

	@RequestMapping("/stank")
	String loadAdminStankPage(Model model) {
		List<StorageTank> stankList = stankRepo.findAll();
		model.addAttribute("stankList", stankList);
		return "admin-stank";
	}

	@RequestMapping("/stank-avtur")
	String loadAdminStankAvturPage(Model model) {
		List<StorageTankAvtur> stankList = stankAvturRepo.findAll();
		model.addAttribute("stankList", stankList);
		return "admin-stank-avtur";
	}

	@RequestMapping("/admin-jetty")
	String loadAdminJettyPage(Model model) {
		List<JettyFormula> jettyList = jettyRepo.findAll();
		model.addAttribute("jettyList", jettyList);
		return "admin-jetty";
	}
	
	@RequestMapping("/admin-depotlpg")
	String loadAdminDepotLpgPage(Model model) {
		List<DepotLPGFormula> depotList = depotRepo.findAll();
		model.addAttribute("depotList", depotList);
		return "admin-depot";
	}
}
