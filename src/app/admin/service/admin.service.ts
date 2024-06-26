import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthStateServiceService } from 'src/app/services/auth/auth-state-service.service';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
    private authState: AuthStateServiceService
  ) {}

  addCategory(categoryDto: any): Observable<any> {
    return this.createAuthorizationHeader().pipe(
      switchMap(headers => this.http.post(BASIC_URL + 'api/admin/category', categoryDto, { headers })),
      catchError((error) => {
        console.error('Error adding category:', error);
        return throwError(error);
      })
    );
  }

  getAllCategories(): Observable<any> {
    return this.createAuthorizationHeader().pipe(
      switchMap(headers => this.http.get(BASIC_URL + 'api/admin/categories', { headers })),
      catchError((error) => {
        console.error('Error fetching categories:', error);
        return throwError(error);
      })
    );
  }
  
  addProduct(productDto: any): Observable<any> {
    return this.createAuthorizationHeader().pipe(
      switchMap(headers => this.http.post(BASIC_URL + 'api/admin/product', productDto, { headers })),
      catchError((error) => {
        console.error('Error adding product:', error);
        return throwError(error);
      })
    );
  }

  getAllProducts(): Observable<any> {
    return this.createAuthorizationHeader().pipe(
      switchMap(headers => this.http.get(BASIC_URL + 'api/admin/products', { headers })),
      catchError((error) => {
        console.error('Error fetching products:', error);
        return throwError(error);
      })
    );
  }

  getAllProductsByName(name:any): Observable<any> {
    return this.createAuthorizationHeader().pipe(
      switchMap(headers => this.http.get(BASIC_URL + `api/admin/search/${name}`, { headers })),
      catchError((error) => {
        console.error('Error fetching products:', error);
        return throwError(error);
      })
    );
  }

  private createAuthorizationHeader(): Observable<HttpHeaders> {
    return this.authState.getToken().pipe(
      map(token => new HttpHeaders().set('Authorization', `Bearer ${token}`))
    );
  }
}
