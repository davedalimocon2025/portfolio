import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Post } from '../models/post.model';


@Injectable({
  providedIn: 'root' // Makes the service a singleton and available throughout the app
})
export class PostService {
  private apiUrl = '/api/posts'; // Your Spring Boot API URL

  constructor(private http: HttpClient) { }

  /**
   * Fetches all posts from the backend.
   * @returns An Observable of an array of Post objects.
   */
  // getPosts(): Observable<Post[]> {
  //   return this.http.get<Post[]>(this.apiUrl);
  // }

  getPosts(searchTerm?: string): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl).pipe(
      map(posts => {
        if (!searchTerm) {
          return posts; // Return all posts if no search term
        }
        // Filter posts where title or content contains the search term (case-insensitive)
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return posts.filter(post =>
          post.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          post.content.toLowerCase().includes(lowerCaseSearchTerm) // Assuming 'content' field
        );
      })
    );
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

}
