package site.etabsam.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import site.etabsam.portfolio.dto.LoginRequest;
import site.etabsam.portfolio.dto.LoginResponse;
import site.etabsam.portfolio.dto.RegistrationRequest;
//import site.etabsam.portfolio.dto.LoginResponse;

import site.etabsam.portfolio.dto.RegistrationResponse;
import site.etabsam.portfolio.model.User;

import org.springframework.dao.DataIntegrityViolationException; // To catch unique username constraint
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;


import jakarta.validation.Valid;
import site.etabsam.portfolio.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/")
@CrossOrigin(origins = "http://localhost:4200")
public class PortfolioController {

    RegistrationRequest registrationRequest;

    private final UserRepository userRepository;

    @Autowired // Spring automatically injects UserRepository
    public PortfolioController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public String sampleOnly() {
        return "sample";
    }

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> registerUser(@Valid @RequestBody RegistrationRequest registrationRequest) {
        // 🚨🚨 SECURITY WARNING: In a real app, hash the password using BCryptPasswordEncoder
        // String hashedPassword = passwordEncoder.encode(registrationRequest.getPassword());
        // User newUser = new User(registrationRequest.getUsername(), hashedPassword);

        // For DEMO ONLY: Using plain password
        User newUser = new User(registrationRequest.getUsername(), registrationRequest.getPassword());

        try {
            // Check if username already exists BEFORE trying to save
            // Although unique constraint on DB will also catch it, pre-check gives clearer error
            if (userRepository.findByUsername(newUser.getUsername()).isPresent()) {
                return new ResponseEntity<>(
                        new RegistrationResponse("Username already exists.", false, null, null),
                        HttpStatus.CONFLICT // 409 Conflict for resource already existing
                );
            }

            User savedUser = userRepository.save(newUser);
            System.out.println("User registered: " + savedUser.getUsername());

            return new ResponseEntity<>(
                    new RegistrationResponse("Registration successful!", true, savedUser.getId(), savedUser.getUsername()),
                    HttpStatus.CREATED // 201 Created for successful resource creation
            );
        } catch (DataIntegrityViolationException e) {
            // This catches unique constraint violations etc., but the pre-check is better.
            System.err.println("Database error during registration: " + e.getMessage());
            return new ResponseEntity<>(
                    new RegistrationResponse("Registration failed due to data integrity violation (e.g., username already exists).", false, null, null),
                    HttpStatus.CONFLICT
            );
        } catch (Exception e) {
            System.err.println("Unexpected error during registration: " + e.getMessage());
            return new ResponseEntity<>(
                    new RegistrationResponse("An unexpected error occurred during registration.", false, null, null),
                    HttpStatus.INTERNAL_SERVER_ERROR // 500 Internal Server Error for unhandled exceptions
            );
        }
    }


    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());

        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(
                    new LoginResponse("Invalid username or password.", false, null),
                    HttpStatus.UNAUTHORIZED // 401 Unauthorized
            );
        }

        User user = userOptional.get();

        if (loginRequest.getPassword().equals(user.getPassword())) {
            // Simulate token generation for a successful login
            String simulatedToken = "mock-jwt-token-for-" + user.getUsername();
            return new ResponseEntity<>(
                    new LoginResponse("Login successful!", true, simulatedToken),
                    HttpStatus.OK
            );
        } else {
            return new ResponseEntity<>(
                    new LoginResponse("Invalid username or password.", false, null),
                    HttpStatus.UNAUTHORIZED
            );
        }
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        errors.put("message", "Validation failed.");
        return errors;
    }
}
