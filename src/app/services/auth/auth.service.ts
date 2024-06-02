import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthStateServiceService } from './auth-state-service.service';
import { AuthResponse } from 'src/app/interface/auth-response.interface';

const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private authState: AuthStateServiceService
  ) { }

  /**
   * Authenticates the user with the provided credentials
   * @param email The user's email
   * @param password The user's password
   * @returns Observable containing user data and token if successful
   */
  login(email: string, password: string): Observable<AuthResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { email, password };
  
    return this.http.post<AuthResponse>(BASIC_URL + '/authenticate', body, { headers }).pipe(
      map(response => {
        console.log('Login response:', response); // Log the response
  
        // Save the token in the auth state service
        this.authState.setToken(response.token);
  
        // Set the user object correctly
        const user = { role: response.role, userId: response.userId };
        this.authState.setUser(user);
  
        return response; // Return the entire response for further processing if needed
      }),
      catchError((error) => {
        console.error('Login Error:', error); 
        return throwError('Login failed: invalid credentials');
      })
    );
  }

  /**
   * Sign out the user
   */
  signOut(): void {
    this.authState.clear();
  }
}
