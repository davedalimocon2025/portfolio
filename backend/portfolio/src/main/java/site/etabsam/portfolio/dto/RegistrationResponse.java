package site.etabsam.portfolio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationResponse {

    private String message;
    private boolean success;
    private Long userId; // Optional: ID of the newly registered user
    private String username;
}
