package com.he194009.fizhstore.service;


import com.he194009.fizhstore.dto.LoginRequest;
import com.he194009.fizhstore.dto.LoginResponse;
import com.he194009.fizhstore.entity.User;
import com.he194009.fizhstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new LoginResponse(
                user.getId(),
                user.getUsername(),
                user.getRole().getName()
        );
    }
}