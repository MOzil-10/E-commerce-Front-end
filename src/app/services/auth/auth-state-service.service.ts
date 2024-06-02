import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateServiceService {

  private tokenSubject: BehaviorSubject<string | null>;
  private userSubject: BehaviorSubject<any | null>;

  constructor() {
    this.tokenSubject = new BehaviorSubject<string | null>(null);
    this.userSubject = new BehaviorSubject<any | null>(null);
   }

   getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

   getUser(): Observable<any | null> {
    return this.userSubject.asObservable();
   }

   setToken(token: string): void {
    this.tokenSubject.next(token);
   }

   setUser(user: any): void {
    console.log('Setting user:', user);
    this.userSubject.next(user);
  }
  

   clear(): void {
    this.tokenSubject.next(null);
    this.userSubject.next(null);
   }
}
