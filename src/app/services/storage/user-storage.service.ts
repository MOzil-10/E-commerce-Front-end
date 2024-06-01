import { Injectable } from '@angular/core';

const Token = 'ecom-token';
const User = 'ecom-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token: string): void {
    window.localStorage.removeItem(Token);
    window.localStorage.setItem(Token, token);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(User);
    window.localStorage.setItem(User, JSON.stringify(user));
  }

  public getToken(): string | null {
    return window.localStorage.getItem(Token);
  }

  public getUser(): any {
    const user = window.localStorage.getItem(User);
    return user ? JSON.parse(user) : null;
  }

  public removeToken(): void {
    window.localStorage.removeItem(Token);
  }

  public removeUser(): void {
    window.localStorage.removeItem(User);
  }
}
