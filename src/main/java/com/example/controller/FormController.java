package com.example.controller;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@SpringBootApplication
public class FormController {

	@RequestMapping("/form")
	String loadForm(Authentication authentication, Model model) {
		System.out.println(authentication.getName());
		model.addAttribute("username", authentication.getName());
		return "form";
	}

}
