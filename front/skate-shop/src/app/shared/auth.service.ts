import { Injectable } from '@angular/core';
import { User } from '../shared/models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) {}

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/all/signup`;
    return this.http.post(api, user)
  }
  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/all/login`, user)
      .subscribe((res: any) => {
        
        localStorage.setItem('access_token', res.accessToken);
        localStorage.setItem('account_connected', res.email);
        localStorage.setItem('account_role', res.role);
        localStorage.setItem('account_id', res.id);
        localStorage.setItem('account_name' , res.firstname + " " + res.lastname)
        
        // this.router.navigate(['/home'])

        this.getUserProfile(res.id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['user-profile/' + res.id]);
        });
      });
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('account_connected')
    localStorage.removeItem('account_role')
    localStorage.removeItem('account_id')
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }
  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/users/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      })
    );
  }
}
