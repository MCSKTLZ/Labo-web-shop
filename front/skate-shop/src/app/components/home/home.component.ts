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
  public isAdmin: boolean = false;

  constructor(public productService : ProductService, private tokenStorage : TokenStorageService) 
      { 
        this.productService.getProducts().subscribe((res) => {
        this.products = res
        console.log(this.products);
        })
        this.searchForm = new FormGroup({
          name : new FormControl('')
        })
        this.tokenStorage.currentUser.subscribe({
          next : (user) => {
            this.isAdmin = this.tokenStorage.isAdmin()
          }
        })
  }

  ngOnInit(): void {
    
  }

  searchProduct() {
    this.productService.searchProducts(this.searchForm.value).subscribe((res) => {
      console.log(res);
      this.products = res
    })
  }

}
