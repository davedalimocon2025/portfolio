package site.etabsam.portfolio.dto;

import jakarta.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data // Provides getters, setters, toString, equals, hashCode
@NoArgsConstructor // Provides a no-argument constructor
@AllArgsConstructor
public class RegistrationRequest {


    @NotBlank(message = "Username cannot be empty")
    private String username;

    @NotBlank(message = "Password cannot be empty")
    private String password;
}
