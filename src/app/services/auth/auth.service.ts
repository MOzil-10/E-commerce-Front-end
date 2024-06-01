import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService
  ) { }

  register(signupRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + '/signup', signupRequest);
  }

  // login(username: string, password: string): Observable<boolean> {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   const body = { username, password };

  //   return this.http.post<any>(BASIC_URL + '/login', body, { headers, observe: 'response' }).pipe(
  //     map((response) => {
  //       const token = response.headers.get('authorization')?.substring(7);
  //       const user = response.body;

  //       if (token && user) {
  //         this.userStorageService.saveToken(token);
  //         this.userStorageService.saveUser(user);
  //         return true;
  //       }
  //       return false;
  //     })
  //   );
  // }

 // AuthService.login method with error handling
login(username: string, password: string): Observable<boolean> {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const body = { username, password };

  return this.http.post<any>(BASIC_URL + '/login', body, { headers, observe: 'response' }).pipe(
      map((response) => {
          const token = response.headers.get('authorization')?.substring(7);
          const user = response.body;

          if (token && user) {
              this.userStorageService.saveToken(token);
              this.userStorageService.saveUser(user);
              return true;
          }
          return false;
      }),
      catchError((error) => {
          console.error('Login Error:', error); // Log the error
          return of(false); // Return Observable of false to handle the error in the component
      })
  );
}


}
