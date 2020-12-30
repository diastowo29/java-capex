package com.example.controller;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@SpringBootApplication
public class AdminController {

	@RequestMapping("/admin")
	String loadAdminPage() {
		return "form";
	}
}
