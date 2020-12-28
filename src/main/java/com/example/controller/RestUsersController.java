package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.User;
import com.example.repository.UserRepository;

@RestController
@RequestMapping("/api/v1")
public class RestUsersController {
	@Autowired
	UserRepository usersRepo;

	@PostMapping("/users/add")
	public User createUsers(@Validated @RequestBody User user) {
		return usersRepo.save(user);
	}

	@GetMapping("/users/{username}")
	public User findUsersByUsername(@PathVariable(value = "username") String username) {
		return usersRepo.findByUsername(username);
	}

	@GetMapping("/users")
	public List<User> findUsers() {
		return usersRepo.findAll();
	}
}
