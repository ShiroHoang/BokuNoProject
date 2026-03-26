package com.he194009.fizhstore.controller;

import com.he194009.fizhstore.dto.LoginRequest;
import com.he194009.fizhstore.dto.LoginResponse;
import com.he194009.fizhstore.dto.RegisterRequest;
import com.he194009.fizhstore.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request, HttpServletRequest servletRequest, HttpServletResponse servletResponse) {
        return authService.login(request, servletRequest, servletResponse);
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return "Register success";
    }

    // Trong AuthController.java
    @PostMapping("/logout")
    public void logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate(); // Xóa session trên server
        }
        SecurityContextHolder.clearContext(); // Xóa quyền trong context
    }
}