package com.associationmanager.security.authentication;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.core.AuthenticationException;

@FunctionalInterface
public interface AuthenticationEntryPoint extends org.springframework.security.web.AuthenticationEntryPoint {
    @Override
    void commence(HttpServletRequest request, HttpServletResponse response,
                  AuthenticationException authException) throws IOException, ServletException;
}
