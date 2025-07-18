

// src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
// Removed NgModule and BrowserModule imports - they don't belong in a component file.
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormGroupDirective, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Important for *ngIf and ngClass directives in standalone components

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { LoginResponse } from './login-reponse';
import { AuthService } from '../../services/auth.sevice';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-login',
  // Mark component as standalone
  standalone: true,
  // Correctly import necessary modules for standalone components
  imports: [
    ReactiveFormsModule, // Provides formGroup, formControlName directives
    CommonModule,         // Provides common directives like *ngIf, ngClass
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {


  loginError:unknown;
   emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  loginForm!: FormGroup;

  // Corrected HttpClient typo here
  constructor(private http:HttpClient,
              private router: Router,
              private authService:AuthService
    ) {} 

  ngOnInit(): void {
    // Initialize the form group with form controls and validators
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3) // Example: minimum 3 characters
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6) // Example: minimum 6 characters
      ])
    });
  }

  // Getter for easy access to form controls in the template
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);

      // Example: Send login data to a backend API
      const { username, password } = this.loginForm.value;
      this.http.post<LoginResponse>('http://localhost/api/v1/login', { username, password })
        .subscribe({
          next: (response:LoginResponse) => {
            console.log('Login successful!', response);
            console.log(response.message);
            localStorage.setItem('userToken',  response.token);
            localStorage.setItem('isLoggedIn', 'true');
            // This line causes the redirection.
            // If you want to go to a specific dashboard, change '/' to that path, e.g., '/dashboard'
            this.router.navigate(['/auth/dashboard']); // Changed to /dashboard as a typical post-login route
          },
          error: (error) => {
            console.error('Login failed!', error);
            // Using alert() is generally not recommended in Angular for better UX.
            // Consider a modal dialog or a message component for user feedback.
            alert('Login failed. Please check your credentials.');
          }
        });
    } else {
      console.log('Form is invalid.');
      // Optionally, mark all controls as touched to display validation messages
      this.loginForm.markAllAsTouched();
    }
  }

  //new code starts here
  onLogin(): void {
     const { username, password } = this.loginForm.value;
    this.loginError = null;
    // Simulate authentication logic
    if ( username === 'admin' && password === 'password') { // Simple hardcoded credentials
      console.log("login clicked")
      this.authService.login(this.loginForm.value).subscribe(() => {
        this.router.navigate(['/admin/dashboard']); // Redirect to admin posts on successful login
      });
    } else {
      this.loginError = 'Invalid username or password.';
    }
  }



  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}