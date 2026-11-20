package com.associationmanager.security.refresh;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RefreshTokenExceptionHandler {
    @ExceptionHandler(RefreshTokenService.InvalidRefreshTokenException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleInvalidRefreshToken(RefreshTokenService.InvalidRefreshTokenException exception) {
        return new ErrorResponse(401, "Jeton invalide", exception.getMessage());
    }

    public record ErrorResponse(int status, String error, String message) {}
}
