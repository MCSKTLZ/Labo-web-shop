import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CurrentUser } from 'src/app/shared/models/currentUser';
import { ProductService } from 'src/app/_services/product.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products : any[]= []
  searchForm : FormGroup
  searchByCat : FormGroup
  searchByBrands : FormGroup
  public isAdmin: boolean = false;
  public isConnected : boolean = false;
  categories : any[]
  brands : any[]
  user : CurrentUser
  cart : any
  userId : any

  constructor(
    public productService : ProductService,
    private tokenStorage : TokenStorageService,  
    private userService : UserService
    ) 
      { 
        this.getAllProducts()

        this.searchForm = new FormGroup({
          name : new FormControl('')
        })
        this.searchByCat = new FormGroup({
          catId : new FormControl('')
        })
        this.searchByBrands = new FormGroup({
          brandId : new FormControl('')
        })
        this.tokenStorage.currentUser.subscribe({
          next : (user) => {
            this.isAdmin = this.tokenStorage.isAdmin()
            this.isConnected = this.tokenStorage.isConnected()
            if(this.isConnected) {
              this.user = user
              this.userId = user.id
              this.getAllCart()
            }
          }
        })
        
        this.productService.getAllCategories().subscribe((res) => {
          this.categories = res
        })
        this.productService.getAllBrands().subscribe((res) => {
          this.brands = res
        })
  }

  ngOnInit(): void {

  }

  getAllProducts() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res
      // console.log(this.products);
      })
  }

  searchProduct() {
    this.productService.searchProducts(this.searchForm.value).subscribe((res) => {
      // console.log(res);
      this.products = res
    })
  }

  searchByCategory() {
    let id = this.searchByCat.value.catId
    this.productService.searchProductByCat(id).subscribe((res) => {
      // console.log(res);
      this.products = res
    })
  }

  searchByBrand() {
    let id = this.searchByBrands.value.brandId
    this.productService.searchProductByBrand(id).subscribe((res) => {
      // console.log(res);
      this.products = res
    })
  }

  getAllCart() {
    this.userService.getAllCart(this.userId).subscribe((res) => {
      this.cart = res.cart
    })
  }

}
