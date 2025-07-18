package site.etabsam.portfolio.dto;

import jakarta.validation.constraints.NotBlank; // For validation annotations
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) for creating a new Post.
 * Contains only the fields expected from the client for creation.
 * Does NOT include ID, createdAt, or updatedAt, as these are server-generated.
 */
@Data // Lombok: Generates getters, setters, toString, equals, hashCode
@NoArgsConstructor // Lombok: Generates a no-argument constructor
@AllArgsConstructor // Lombok: Generates an all-argument constructor
public class PostCreateDTO {

    @NotBlank(message = "Title cannot be empty") // Ensure title is not null or blank
    @Size(max = 255, message = "Title cannot exceed 255 characters")
    private String title;

    @NotBlank(message = "Content cannot be empty")
    private String content; // @Lob is for JPA entity, not needed here

    @NotBlank(message = "Author cannot be empty")
    @Size(max = 100, message = "Author name cannot exceed 100 characters")
    private String author;

    @NotBlank(message = "Category cannot be empty")
    private String category;

    @Size(max = 500, message = "Tags cannot exceed 500 characters")
    private String tags; // Can be null/empty, so no @NotBlank

    private boolean published = false; // Client can set this, default to false if not provided
}