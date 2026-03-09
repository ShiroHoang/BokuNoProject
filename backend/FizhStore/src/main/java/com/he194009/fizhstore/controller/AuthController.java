package com.he194009.fizhstore.controller;

import com.he194009.fizhstore.dto.LoginRequest;
import com.he194009.fizhstore.dto.LoginResponse;
import com.he194009.fizhstore.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}