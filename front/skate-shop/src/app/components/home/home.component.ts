import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products : any

  constructor(public productService : ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res) => {
      this.products = res
      console.log(this.products);
      
    })
  }

}
