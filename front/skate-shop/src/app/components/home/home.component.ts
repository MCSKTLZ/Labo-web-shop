import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products : any[]= []
  searchForm : FormGroup

  constructor(public productService : ProductService) 
      { this.productService.getProducts().subscribe((res) => {
        this.products = res
        console.log(this.products);
        })
        this.searchForm = new FormGroup({
          name : new FormControl('')
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
