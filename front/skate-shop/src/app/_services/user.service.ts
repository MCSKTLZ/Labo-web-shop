import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

const API_URL = 'http://localhost:3000/test/';
@Injectable({
  providedIn: 'root'
})

export class UserService {

  endpoint: string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private cartSubject: BehaviorSubject<any>
  public cart$: Observable<any> 

  public get cartValue(): any {
    return this.cartSubject.value;
  }

  constructor(private http: HttpClient) { 
    this.cartSubject = new BehaviorSubject<any>(null);
    this.cart$ = this.cartSubject.asObservable()
  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  getUserProfile(id: any): Observable<any> {
        let api = `${this.endpoint}/users/${id}`;
        return this.http.get(api, { headers: this.headers }).pipe(
          map((res) => {
            return res || {};
          })
        );
      }
  updateUserAddress(address : any, id : number): Observable<any> {
    return this.http.post(this.endpoint + "/users/address/" + id, address )
  }

  changePass(password : any, id : number) : Observable<any> {
    return this.http.patch(this.endpoint + "/users/password/" + id, password )
  }

  getAllCart(id: any): Observable<any> {
    return this.http.get<any>(this.endpoint + "/users/cart/all/" + id).pipe(
      map(cart => 
        { 
          this.cartSubject.next(cart)
          return cart
        }))
  }

  getCartLength() {
    return this.cartSubject
  }
  addProductToCart(id: any, userId :any) : Observable<any>{ 
    return this.http.get(this.endpoint + "/users/cart/product/" + id + "/" + userId)
  }
  removeFromCart(id: any, userId : any) : Observable<any>{
    return this.http.delete(this.endpoint + "/users/cart/product/" + id + "/" + userId)
  }
}