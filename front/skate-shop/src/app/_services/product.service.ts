import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/all/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() : Observable<any> {
    return this.http.get(AUTH_API + "/product", httpOptions).pipe(
      map((res) => {
        return res || {};
      })
    );
  }

  searchProducts(search : any) : Observable<any> {
    return this.http.post(AUTH_API + "/products/search", search, httpOptions).pipe(
      map((res) => {
        return res || {};
      })
    )
  }

  getProductById(id: any) : Observable<any> {
    return this.http.get(AUTH_API + "/product/" + id, httpOptions).pipe(
      map((res) => {
        return res || {};
      })
    )
  }
}
