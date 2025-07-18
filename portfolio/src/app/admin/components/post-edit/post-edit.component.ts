// src/app/components/post-edit/post-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // For getting route params and navigation
import { FormsModule } from '@angular/forms'; // For ngModel (two-way data binding)
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule // Important for form handling
  ],
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  post: Post | undefined; // The post object to be edited
  isLoading: boolean = true;
  errorMessage: string | null = null;
  successMessage: string | null = null; // To show success messages

  constructor(
    private route: ActivatedRoute, // Used to read route parameters (like the post ID)
    private router: Router,       // Used for programmatic navigation
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId = Number(params.get('id')); // Get the 'id' from the URL
      if (postId) {
        this.getPostDetails(postId);
      } else {
        this.errorMessage = 'No post ID provided for editing.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Fetches the details of the post to be edited.
   * @param id The ID of the post.
   */
  getPostDetails(id: number): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.postService.getPostById(id).subscribe({
      next: (data) => {
        this.post = data; // Assign fetched data to the post object
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching post details:', error);
        this.errorMessage = 'Failed to load post for editing. Please try again.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Handles the form submission to update the post.
   */
  onSubmit(): void {
    if (this.post && this.post.id) { // Ensure post and its ID exist
      this.isLoading = true; // Show loading spinner during submission
      this.errorMessage = null;
      this.successMessage = null;

      this.postService.updatePost(this.post).subscribe({
        next: (updatedPost) => {
          this.successMessage = 'Post updated successfully!';
          this.isLoading = false;
          console.log('Post updated:', updatedPost);
          // Optional: Navigate back to the posts list or detail page after update
          // setTimeout(() => {
          //   this.router.navigate(['/posts']);
          // }, 2000); // Navigate after 2 seconds
        },
        error: (error) => {
          console.error('Error updating post:', error);
          this.errorMessage = 'Failed to update post. Please try again.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Cannot update post: Post data is missing or invalid.';
    }
  }

  /**
   * Navigates back to the main posts list.
   */
  goBack(): void {
    this.router.navigate(['/admin/']); // Navigate to the root path (your posts list)
  }
}