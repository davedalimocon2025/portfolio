package site.etabsam.portfolio.services;


import site.etabsam.portfolio.dto.PostCreateDTO;
import site.etabsam.portfolio.model.Post;
import site.etabsam.portfolio.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    public Post createPost(PostCreateDTO postDto) {
        // Convert DTO to entity
        Post post = new Post();
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setAuthor(postDto.getAuthor());
        post.setCategory(postDto.getCategory());
        post.setTags(postDto.getTags());
        post.setPublished(postDto.isPublished());
        // ID, createdAt, updatedAt are automatically handled by the entity/JPA

        return postRepository.save(post);
    }

    public Post updatePost(Long id, Post postDetails) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id)); // Custom exception handling is better

        post.setTitle(postDetails.getTitle());
        post.setContent(postDetails.getContent());
        post.setAuthor(postDetails.getAuthor());
        post.setCategory(postDetails.getCategory());
        post.setTags(postDetails.getTags());
        post.setPublished(postDetails.isPublished());
        // createdAt is not updated
        // updatedAt is automatically updated by @UpdateTimestamp

        return postRepository.save(post);
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    public List<Post> getPublishedPosts() {
        return postRepository.findByPublished(true);
    }
}