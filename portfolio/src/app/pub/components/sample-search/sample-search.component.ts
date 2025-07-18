import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf, ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';

// --- Simulate a Service (post.service.ts) ---
// In a real Angular app, this would be a separate injectable service.
// For this self-contained example, we'll define it here.
// interface Post {
//   id: number;
//   title: string;
//   content: string;
// }

// class PostService {
//   private allPosts: Post[] = [
//     { id: 1, title: 'Introduction to Angular', content: 'Learn the basics of Angular framework.' },
//     { id: 2, title: 'RxJS Operators in Depth', content: 'Understanding debounceTime, switchMap, etc.' },
//     { id: 3, title: 'Building Reactive Forms with Angular', content: 'A guide to form handling.' },
//     { id: 4, title: 'Getting Started with Angular CLI', content: 'Tools for Angular development.' },
//     { id: 5, title: 'Advanced TypeScript Features', content: 'Explore decorators and utility types.' },
//     { id: 6, title: 'Database Integration with Spring Boot', content: 'Connecting to PostgreSQL and MySQL.' },
//     { id: 7, title: 'Deploying Applications with Nginx and Docker', content: 'Containerization and web server setup.' },
//     { id: 8, title: 'Linux Command Line Essentials', content: 'Basic commands for developers.' },
//     { id: 9, title: 'Optimizing Angular Performance', content: 'Tips and tricks for faster apps.' },
//     { id: 10, title: 'Frontend Development Best Practices', content: 'Clean code and scalable architectures.' },
//   ];

//   fetchPosts(query: string): Observable<Post[]> {
//     return new Observable(observer => {
//       setTimeout(() => {
//         if (!query || query.trim() === '') {
//           observer.next([]);
//           observer.complete();
//           return;
//         }

//         const filteredPosts = this.allPosts.filter(post =>
//           post.title.toLowerCase().includes(query.toLowerCase()) ||
//           post.content.toLowerCase().includes(query.toLowerCase())
//         );
//         observer.next(filteredPosts);
//         observer.complete();
//       }, 300); // Simulate network delay
//     });
//   }
// }

@Component({
  selector: 'app-sample-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './sample-search.component.html',
  styleUrl: './sample-search.component.css'
})
export class SampleSearchComponent implements OnInit, OnDestroy{

  searchTerm: string = '';
  posts: Post[] = [];
  loading: boolean = false;
  error: string | null = null;

  // RxJS Subject to handle search input changes
   searchSubject = new Subject<string>();

constructor(private postService:PostService) {

}

  ngOnInit() {
    // Set up the RxJS pipeline for search
    this.searchSubject.pipe(
      debounceTime(200), // Wait for 400ms after the last keystroke
      distinctUntilChanged(), // Only emit if the value has changed
      tap(() => { // Use tap to handle side effects like setting loading state
        this.loading = true;
        this.error = null;
      }),
      switchMap(query => {
        if (query.trim() === '') {
          this.loading = false;
          return of([]); // Return an empty observable if query is empty
        }
        return this.postService.getPosts(query).pipe(
          catchError(err => {
            this.error = 'Failed to fetch posts. Please try again.';
            this.loading = false;
            console.error(err);
            return of([]); // Return empty array on error to prevent stream from breaking
          })
        );
      }),
      catchError(err => { // Catch errors from the outer stream if any
        this.error = 'An unexpected error occurred.';
        this.loading = false;
        console.error(err);
        return of([]); // Return empty array to prevent stream from breaking
      })
    ).subscribe(results => {
      this.posts = results;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    // Clean up the subscription when the component is destroyed
    this.searchSubject.unsubscribe();
  }
}

