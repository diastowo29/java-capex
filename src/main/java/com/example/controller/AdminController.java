package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.model.StorageTank;
import com.example.repository.StorageTankRepository;

@Controller
@SpringBootApplication
public class AdminController {
	
	@Autowired
	StorageTankRepository stankRepo;

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
}
