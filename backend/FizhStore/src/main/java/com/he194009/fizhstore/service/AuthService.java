package com.he194009.fizhstore.service;


import com.he194009.fizhstore.dto.LoginRequest;
import com.he194009.fizhstore.dto.LoginResponse;
import com.he194009.fizhstore.dto.RegisterRequest;
import com.he194009.fizhstore.entity.Role;
import com.he194009.fizhstore.entity.User;
import com.he194009.fizhstore.repository.RoleRepository;
import com.he194009.fizhstore.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    private final SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();


    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    //register
    public void register(RegisterRequest request) {

        // 1. check username tồn tại
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // 2. lấy role USER
        Role role = roleRepository.findByName("ROLE_USER")
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
    public LoginResponse login(LoginRequest request, HttpServletRequest servletRequest, HttpServletResponse servletResponse) {
        // 1. Xác thực
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        // 2. Thiết lập Authentication vào Context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 3. QUAN TRỌNG: Lưu Context này vào Session để Server gửi Set-Cookie về
        securityContextRepository.saveContext(SecurityContextHolder.getContext(), servletRequest, servletResponse);

        User user = userRepository.findByUsername(request.getUsername()).get();
        return new LoginResponse(user.getId(), user.getUsername(), user.getRole().getName());
    }
}