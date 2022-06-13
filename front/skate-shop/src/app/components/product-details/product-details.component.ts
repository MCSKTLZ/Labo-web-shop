import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';

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
    private productService : ProductService
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

}
