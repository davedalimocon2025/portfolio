export interface JwtResponse {
    token: string;    // The actual JWT token
    type: string;     // Typically "Bearer"
    id: number;       // User ID
    username: string; // User's username
    role: string;     // User's role (e.g., "ROLE_ADMIN", "ROLE_USER")
  }
  