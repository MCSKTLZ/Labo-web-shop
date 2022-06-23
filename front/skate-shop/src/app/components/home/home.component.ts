import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/_services/product.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products : any[]= []
  searchForm : FormGroup
  searchByCat : FormGroup
  public isAdmin: boolean = false;
  categories : any[]

  constructor(public productService : ProductService, private tokenStorage : TokenStorageService) 
      { 
        this.getAllProducts()
        
        this.searchForm = new FormGroup({
          name : new FormControl('')
        })
        this.searchByCat = new FormGroup({
          catId : new FormControl('')
        })
        this.tokenStorage.currentUser.subscribe({
          next : (user) => {
            this.isAdmin = this.tokenStorage.isAdmin()
          }
        })
        this.productService.getAllCategories().subscribe((res) => {
          this.categories = res
        })
  }

  ngOnInit(): void {

  }

  getAllProducts() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res
      console.log(this.products);
      })
  }

  searchProduct() {
    this.productService.searchProducts(this.searchForm.value).subscribe((res) => {
      console.log(res);
      this.products = res
    })
  }

  searchByCategory() {
    let id = this.searchByCat.value.catId
    this.productService.searchProductByCat(id).subscribe((res) => {
      console.log(res);
      this.products = res
    })
  }

}
