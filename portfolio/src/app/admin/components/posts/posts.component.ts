import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { Router, UrlTree } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-posts',
  imports: [CommonModule,
  FormsModule,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class AdminPostsComponent implements OnInit{
 posts: Post[] = []; 
  isLoading: boolean = true; 
  errorMessage: string | null = null; 
allPosts: Post[] = []; 
searchTerm: string = ''; 

  constructor(private postService: PostService, private router:Router) { }

  ngOnInit(): void {
    this.fetchPosts(); 
  }


  fetchPosts(): void {
    this.isLoading = true;
    this.errorMessage = null; 

    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data; 
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
        this.errorMessage = 'Failed to load posts. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  formatTags(tagsString: string | undefined): string {
    if (!tagsString) {
      return 'No tags';
    }
    return tagsString.split(',').map(tag => tag.trim()).join(', ');
  }

  // viewPost(postId:any):void{
  // this.router.navigate(['/posts', postId]);
  //   console.log(postId);
  // }

    viewPost(postId: number): void { // Changed postId type to number for clarity
    console.log('View Post clicked for ID:', postId);
    // Create a UrlTree from the router configuration
    const urlTree: UrlTree = this.router.createUrlTree(['/posts', postId]);
    // Serialize the UrlTree to get the full URL string
    const url: string = this.router.serializeUrl(urlTree);
    // Open the URL in a new tab
    window.open(url, '_blank');
  }
 
  editPost(postId: number): void {
    this.router.navigate(['admin/posts/edit', postId]);
  }
  deletePost(postId: number): void {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      console.log('User confirmed deletion for Post ID:', postId);
      this.postService.deletePost(postId).subscribe({
        next: () => {
          this.fetchPosts();
        },
        error: (err) => {
          console.error('Error deleting post:', err);
          this.errorMessage = 'Failed to delete post. Please try again.';
        }
      });
    } else {
      console.log('Deletion cancelled by user for Post ID:', postId);
    }
  }

  createNewPost():void {
    this.router.navigate(['/admin/posts/create']);
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
}

