import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../shared/models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentUser } from '../shared/models/currentUser';

const AUTH_API = 'http://localhost:3000/all/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 
  }

  register(firstname: string, lastname : string , email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      firstname,
      lastname,
      email,
      password
    }, httpOptions);
  }
}
