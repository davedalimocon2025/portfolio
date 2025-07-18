package site.etabsam.portfolio.dto;

import jakarta.validation.constraints.NotBlank; // For validation
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Lombok annotation to generate getters, setters, equals, hashCode, and toString
@NoArgsConstructor // Lombok annotation to generate a no-argument constructor
@AllArgsConstructor // Lombok annotation to generate a constructor with all arguments
public class LoginRequest {

    @NotBlank(message = "Username cannot be empty") // Ensures username is not null or just whitespace
    private String username;

    @NotBlank(message = "Password cannot be empty") // Ensures password is not null or just whitespace
    private String password;
}