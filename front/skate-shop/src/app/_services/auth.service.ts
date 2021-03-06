import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { RegisterUser } from '../shared/models/registerUser';


const AUTH_API = 'http://localhost:3000/all/';
const USER_API = 'http://localhost:3000/users/'
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
    return this.http.post(AUTH_API + 'signup', user , httpOptions)
  }
  
  updateUser(user : any, id : number): Observable<any> {
    return this.http.patch(USER_API + 'update/' + id, user, httpOptions)
  }

  sendMailReset(email : any) : Observable<any> {
    return this.http.post(AUTH_API + 'user/reset-mail/' + email, {} ,httpOptions)
      .pipe(
        map((res) => {
          return res || {};
        })
      );
  }

  resetPassword(id : any, token : any, password : any) :Observable<any> {
    return this.http.post(AUTH_API + "user/new-password/" + id + "/" + token , password, httpOptions)
      .pipe(
        map((res) => {
          return res || {};
        })
      );
  }
}
