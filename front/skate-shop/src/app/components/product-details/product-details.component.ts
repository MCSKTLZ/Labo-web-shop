import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product : any

  constructor( 
    private actRoute: ActivatedRoute,
    public router: Router,
    private productService : ProductService,
    public userService : UserService
    ) 
    {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.productService.getProductById(id).subscribe((res) => {
      this.product = res
      console.log(this.product);
      
    })
    }

  ngOnInit(): void {
  }

  addToCart(id: any) {
    this.userService.addProductToCart(id).subscribe((res)=> {
      console.log(res);
      
    })
  }
}
