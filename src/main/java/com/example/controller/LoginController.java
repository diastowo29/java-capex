package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.model.User;
import com.example.repository.UserRepository;

@Controller
@SpringBootApplication
public class LoginController {
	@Autowired
	UserRepository userRepo;

	@RequestMapping("/")
	String submitLogin() {
		return "redirect:/form";
	}

	@RequestMapping("/login")
	String loadLogin() {
		User admin = userRepo.findByUsername("admin");
		if (admin == null) {
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String pswd = encoder.encode("admin");

			User newAdmin = new User();
			newAdmin.setUsername("admin");
			newAdmin.setPassword(pswd);
			newAdmin.setEnabled(true);
			newAdmin.setRole("ADMIN");

			userRepo.save(newAdmin);
		}
		return "login";
	}

	@RequestMapping("/login-error")
	String loginError() {
		return "login";
	}

	@RequestMapping("/logout")
	String loadLogout() {
		return "login";
	}
}
