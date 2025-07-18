import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root' // Makes the service a singleton and available throughout the app
})
export class PostService {
  private apiUrl = 'http://localhost/api/posts'; // Your Spring Boot API URL

  constructor(private http: HttpClient) { }

  /**
   * Fetches all posts from the backend.
   * @returns An Observable of an array of Post objects.
   */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }


   getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  /**
   * Updates an existing post on the backend.
   * @param post The Post object with updated data (must include its ID).
   * @returns An Observable of the updated Post object.
   */
  updatePost(post: Post): Observable<Post> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    // The PUT request usually targets the specific resource by ID
    return this.http.put<Post>(`${this.apiUrl}/${post.id}`, post, httpOptions);
  }


   deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  createPost(post: Post): Observable<Post> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Post>(this.apiUrl, post, httpOptions); // POST request to the base API URL
  }
  
}
