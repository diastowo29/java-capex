package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.model.User;
import com.example.repository.UserRepository;

@Controller
@SpringBootApplication
public class RegisterController {

	@Autowired
	UserRepository userRepo;

	@RequestMapping("/register")
	String loadRegister(Model model) {
		model.addAttribute("user", new User());
		return "register";
	}

	@RequestMapping(value = "/do_register", method = RequestMethod.POST)
	String doRegister(@RequestParam(value = "username", required = false) String username,
			@RequestParam(value = "password", required = false) String password) {
		System.out.println(username);

		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String pswd = encoder.encode(password);
		
		User newUser = new User();
		newUser.setUsername(username);
		newUser.setPassword(pswd);
		newUser.setEnabled(true);
		newUser.setRole("USER");
		userRepo.save(newUser);
		
		return "register";
	}
}
