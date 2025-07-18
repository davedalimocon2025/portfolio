package site.etabsam.portfolio.model;

import jakarta.persistence.*; // Use jakarta.persistence for Spring Boot 3+
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity // Marks this class as a JPA entity
@Table(name = "posts") // Specifies the table name in the database
@Data // Lombok: Generates getters, setters, toString, equals, hashCode
@NoArgsConstructor // Lombok: Generates a no-argument constructor
@AllArgsConstructor // Lombok: Generates an all-argument constructor
public class Post {

    @Id // Marks this field as the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increments the ID for new entities
    private Long id;

    @Column(nullable = false, length = 255) // Not null, max length 255
    private String title;

    @Lob // For large text fields (maps to TEXT or CLOB in database)
    @Column(nullable = false)
    private String content;

    @Column(nullable = false, length = 100)
    private String author;

    @Column(nullable = false)
    private String category;

    // A simple way to store tags as a comma-separated string
    // For more complex tag management (many-to-many relationship),
    // you would create a separate Tag entity and use @ManyToMany.
    @Column(length = 500)
    private String tags; // e.g., "java,spring-boot,backend"

    @Column(nullable = false)
    private boolean published = false; // Default to false

    @CreationTimestamp // Automatically sets creation timestamp on persist
    @Column(nullable = false, updatable = false) // Not nullable, and not updated on subsequent saves
    private LocalDateTime createdAt;

    @UpdateTimestamp // Automatically updates timestamp on every update
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // Optional: If you want to manage tags as a Set<String> directly in the same table,
    // you can use @ElementCollection. This would typically create a separate join table
    // to store the tags for each post. This is a more normalized approach than a comma-separated string.
    // @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    // @CollectionTable(name = "post_tags", joinColumns = @JoinColumn(name = "post_id"))
    // @Column(name = "tag")
    // private Set<String> tags = new HashSet<>();

    // --- You can add custom constructors or methods if Lombok's aren't sufficient ---

    // Example of a custom method for convenience
    public Set<String> getTagsAsSet() {
        if (this.tags == null || this.tags.trim().isEmpty()) {
            return new HashSet<>();
        }
        Set<String> tagSet = new HashSet<>();
        for (String tag : this.tags.split(",")) {
            tagSet.add(tag.trim());
        }
        return tagSet;
    }

    public void setTagsFromSet(Set<String> tagSet) {
        if (tagSet == null || tagSet.isEmpty()) {
            this.tags = null;
        } else {
            this.tags = String.join(",", tagSet);
        }
    }

}
