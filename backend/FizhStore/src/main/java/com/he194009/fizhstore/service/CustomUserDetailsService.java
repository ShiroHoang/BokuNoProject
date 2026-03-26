package com.he194009.fizhstore.service;

import com.he194009.fizhstore.repository.UserRepository;
import com.he194009.fizhstore.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import com.he194009.fizhstore.entity.User;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // map role từ DB → Spring Security
        String roleName = user.getRole().getName();

        // nếu DB = ADMIN → convert thành ROLE_ADMIN
        if (!roleName.startsWith("ROLE_")) {
            roleName = "ROLE_" + roleName;
        }

        return new CustomUserDetails(
                user,
                List.of(new SimpleGrantedAuthority(roleName))
        );
    }
}