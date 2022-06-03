import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterUser } from '../shared/models/registerUser';


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

  register(user : RegisterUser): Observable<any> {
    return this.http.post(AUTH_API + 'signup', user , httpOptions);
  }
}
