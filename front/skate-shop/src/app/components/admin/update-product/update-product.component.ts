import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  product : any
  productForm!: FormGroup;
  updateSuccess = false;
  errorMessage! : string;

  constructor(
    private actRoute: ActivatedRoute,
    public router: Router,
    private productService : ProductService,
  ) { 
    let id = actRoute.snapshot.paramMap.get('id')
    this.productService.getProductById(id).subscribe((res) => {
      this.product = res
      console.log(this.product);
    })
  }

  ngOnInit(): void {
  }

}
