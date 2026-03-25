package com.he194009.fizhstore.service;


import com.he194009.fizhstore.dto.LoginRequest;
import com.he194009.fizhstore.dto.LoginResponse;
import com.he194009.fizhstore.dto.RegisterRequest;
import com.he194009.fizhstore.entity.Role;
import com.he194009.fizhstore.entity.User;
import com.he194009.fizhstore.repository.RoleRepository;
import com.he194009.fizhstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    //register
    public void register(RegisterRequest request) {

        // 1. check username tồn tại
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // 2. lấy role USER
        Role role = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // 3. tạo user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setRole(role);

        // 4. lưu DB
        userRepository.save(user);
    }

    //login
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new LoginResponse(
                user.getId(),
                user.getUsername(),
                user.getRole().getName()
        );
    }
}