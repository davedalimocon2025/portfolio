
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // For getting route params and navigation
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;
  isLoading: boolean = true;
  errorMessage: string | null = null;


  constructor(
    private route: ActivatedRoute, // To get the ID from the URL
     private router: Router,       // For navigation (e.g., go back)
    private postService: PostService
  ) { }

  ngOnInit(): void {
    // Subscribe to route parameter changes to get the post ID
    this.route.paramMap.subscribe(params => {
      const postId = Number(params.get('id')); // Get the 'id' parameter from the URL
      if (postId) {
        this.fetchPostDetails(postId);
      } else {
        this.errorMessage = 'No post ID provided.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Fetches the details of a specific post.
   * @param id The ID of the post to fetch.
   */
  fetchPostDetails(id: number): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.postService.getPostById(id).subscribe({
      next: (data) => {
        this.post = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching post details:', error);
        this.errorMessage = 'Failed to load post details. Post might not exist or there was a server error.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Navigates back to the main posts list.
   */
  goBack(): void {
    this.router.navigate(['/posts']); // Navigate back to the root path
  }
}