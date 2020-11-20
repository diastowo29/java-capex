package com.example.controller;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@SpringBootApplication
public class FormController {

	@RequestMapping("/form")
	String loadForm() {
		return "form";
	}

}
