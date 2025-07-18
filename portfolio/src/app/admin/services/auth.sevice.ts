// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoginRequest } from '../../admin/models/login-request.model'
import { JwtResponse } from '../../admin/models/jwt-response.model' 
import { Router } from '@angular/router'; // Import Router for redirects after logout

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Base URL for your authentication API endpoint
  private apiUrl = 'http://localhost/api/v1/login';
  // Key for storing the JWT token in local storage
  private tokenKey = 'jwt_token';
  private isLoggedIn:string | null = '';

  // BehaviorSubject to track the login status. Initialized based on token presence.
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  // Publicly exposed Observable for components to subscribe to authentication status changes
  public isAuthenticated: Observable<boolean> = this.loggedIn.asObservable();

  // BehaviorSubject to track current user details (e.g., username, role).
  private currentUserSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  // Publicly exposed Observable for components to subscribe to current user changes
  public currentUser: Observable<any | null> = this.currentUserSubject.asObservable();


  constructor(private http: HttpClient, private router: Router) {
    // On service initialization, check if a token exists in local storage
    // and set the initial loggedIn status accordingly.
    if (this.hasToken()) {
      // In a more complex app, you might decode the token here to extract and
      // set currentUserSubject with actual user details from the token.
      // For now, we just indicate that a token is present.
      const storedUsername = localStorage.getItem('username');
      const storedRole = localStorage.getItem('role');
      if (storedUsername && storedRole) {
          this.currentUserSubject.next({ username: storedUsername, role: storedRole });
      }
    }
  }

  /**
   * Checks if a JWT token exists in local storage.
   * @returns boolean - true if a token exists, false otherwise.
   */
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  /**
   * Sends login credentials to the backend API.
   * If successful, stores the JWT token and updates authentication status.
   * @param credentials - An object containing username and password.
   * @returns Observable<JwtResponse> - The JWT response from the backend.
   */
  login(credentials: LoginRequest): Observable<JwtResponse> {
    // Send a POST request to the backend's login endpoint
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, credentials).pipe(
      // Use tap to perform side effects after a successful login API call
      tap(response => {
        // Store the JWT token received from the backend
        localStorage.setItem(this.tokenKey, response.token);
        // Store other relevant user details for easy access (e.g., username, role)
        localStorage.setItem('username', response.username);
        localStorage.setItem('role', response.role);
        // Update the BehaviorSubjects to reflect the logged-in state
        this.loggedIn.next(true);
        this.currentUserSubject.next({ username: response.username, role: response.role });
        console.log('Login successful, token stored.');
      }),
      // Use catchError to handle any errors during the login API call
      catchError(error => {
        // If login fails, ensure authentication status is set to false
        this.loggedIn.next(false);
        this.currentUserSubject.next(null);
        console.error('Login failed:', error);
        // Re-throw the error so components can handle specific error messages
        throw error;
      })
    );
  }

  /**
   * Logs out the user by removing the JWT token and resetting authentication status.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey); // Remove the JWT token
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');    // Remove stored username
    localStorage.removeItem('role');        // Remove stored role
    this.loggedIn.next(false);              // Update loggedIn status
    this.currentUserSubject.next(null);     // Clear current user
    console.log('User logged out.');
    this.router.navigate(['/login']); // Redirect to login page after logout
  }

  /**
   * Retrieves the JWT token from local storage.
   * @returns string | null - The JWT token if present, otherwise null.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Checks the current authentication status synchronously.
   * @returns boolean - true if the user is considered logged in, false otherwise.
   */
  isUserLoggedIn():  boolean {
    this.isLoggedIn = localStorage.getItem('isLoggedIn');
    if (this.isLoggedIn){
        console.log(this.isLoggedIn);
        return true;
    }
    return  false;
  }
  

  /**
   * Gets the role of the currently logged-in user from local storage.
   * @returns string | null - The user's role if available, otherwise null.
   */
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
}