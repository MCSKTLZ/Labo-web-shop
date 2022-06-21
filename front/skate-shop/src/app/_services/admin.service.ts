import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/admin/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  updateProduct(productId: any, product : any ) : Observable<any> {
    return this.http.patch(AUTH_API + "product/update/" + productId , product , httpOptions)
      .pipe(
        map((res) => {
          return res || {};
        })
      );
  }

  addProduct(product : any) : Observable<any> {
    return this.http.post(AUTH_API + "product/new", product, httpOptions)
      .pipe(
        map((res) => {
          return res || {};
        })
      );
  }

  addCategory(productid: any, category : any) : Observable<any> {
    return this.http.patch(AUTH_API + "category/product/" + productid, category, httpOptions)
      .pipe(
        map((res) => {
          return res || {};
        })
      );
  }
}
