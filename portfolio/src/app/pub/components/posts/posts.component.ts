import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for ngFor, ngIf etc.
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { Router, UrlTree } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SampleSearchComponent } from '../sample-search/sample-search.component';

@Component({
  selector: 'posts',
  imports: [CommonModule, FormsModule,SampleSearchComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit{
allPosts: Post[] = []; 
  searchTerm: string = ''; 
 posts: Post[] = []; // Array to hold the fetched posts
  isLoading: boolean = true; // Flag to indicate loading state
  errorMessage: string | null = null; // To store any error messages

  constructor(private postService: PostService, private router:Router) { }

  ngOnInit(): void {
    this.fetchPosts(); // Fetch posts when the component initializes
  }

  /**
   * Fetches posts from the PostService and updates the component's state.
   */
  fetchPosts(): void {
    this.isLoading = true;
    this.errorMessage = null; // Clear previous errors

    this.postService.getPosts().subscribe({
      next: (data) => {
        // this.posts = data; // Assign fetched data to the posts array
        this.posts = data.filter(post => post.published);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
        this.errorMessage = 'Failed to load posts. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  viewPost(postId: number): void { // Changed postId type to number for clarity
    console.log('View Post clicked for ID:', postId);
    // Create a UrlTree from the router configuration
    const urlTree: UrlTree = this.router.createUrlTree(['/posts', postId]);
    // Serialize the UrlTree to get the full URL string
    const url: string = this.router.serializeUrl(urlTree);
    // Open the URL in a new tab
    window.open(url, '_blank');
  }

  // Helper function to format tags for display
  formatTags(tagsString: string | undefined): string {
    if (!tagsString) {
      return 'No tags';
    }
    return tagsString.split(',').map(tag => tag.trim()).join(', ');
  }

  applySearch(): void {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      
      this.posts = [...this.allPosts]; 
    } else {
      
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase().trim();
      this.posts = this.allPosts.filter(post =>
        post.title.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
  }

   goBack(): void {
    console.log("naclick naman");
    this.errorMessage = null;
    window.location.reload();
    this.router.navigate(['/posts']); // Navigate back to the root path
  }
}
