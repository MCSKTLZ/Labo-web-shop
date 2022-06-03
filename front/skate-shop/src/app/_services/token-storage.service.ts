import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CurrentUser } from '../shared/models/currentUser';
import { User } from '../shared/models/user';
import { AuthService } from './auth.service';

const AUTH_API = 'http://localhost:3000/all/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private _currentUserSubject : BehaviorSubject<CurrentUser> 
  public currentUser : Observable<CurrentUser>
  
  public get currentUserValue(): CurrentUser {
    return this._currentUserSubject.value;
  }

  constructor(private AuthService : AuthService, private http: HttpClient) { 
    this._currentUserSubject = new BehaviorSubject<CurrentUser>(JSON.parse(window.sessionStorage.getItem('auth-user')));
    this.currentUser = this._currentUserSubject.asObservable();
  }

  login(user : User): Observable<CurrentUser> {
    return this.http.post<any>(AUTH_API + 'login', user, httpOptions).pipe(
      map(conUser => 
        { 
          this._currentUserSubject.next(conUser)
          return conUser
        }))
    }

  signOut(): void {
    window.sessionStorage.clear();
    this._currentUserSubject.next(null);
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
  isConnected() : boolean {
    return (this.currentUserValue != null);
  }

  isAdmin() : boolean {
    if(this.isConnected()){
      if (this.currentUserValue.role === "admin") return true
      else 
        return false
    }else 
      return false
  }
}