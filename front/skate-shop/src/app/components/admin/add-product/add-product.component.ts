import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  product : any
  productForm!: FormGroup;
  updateSuccess = false;
  errorMessage! : string;
  brands : any[]
  categories : any[]

  constructor(
    private actRoute: ActivatedRoute,
    public router: Router,
    private productService : ProductService,
    public fb: FormBuilder,
    private adminService : AdminService
  ) { 

    this.productService.getAllBrands().subscribe((res) => {
      this.brands = res
    })

    this.productService.getAllCategories().subscribe((res) => {
      this.categories = res
    })

    this.productForm = new FormGroup({
      productName: new FormControl ('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25)
      ])),
      description: new FormControl ('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100)
      ])),
      price: new FormControl ('', Validators.compose([
        Validators.required
      ])),
      promotion: new FormControl (''),
      status: new FormControl ('', Validators.compose([
        Validators.required
      ])),
      brands: new FormControl (''),
      category: new FormControl (''),
      stock: new FormControl ('', Validators.compose([
        Validators.required
      ])),
    });
  }

  ngOnInit(): void {
  }

  updateProduct() {
    const productUpInput = this.productForm.value
    const category = {
      id : productUpInput.category
    }
    const productUp = {
      name : productUpInput.productName,
      description : productUpInput.description,
      price : productUpInput.price,
      stock : productUpInput.stock,
      status : productUpInput.status,
      promo : productUpInput.promotion,
      BrandId : productUpInput.brands
    }
    this.adminService.updateProduct(this.product.id, productUp)
      .subscribe({
        next : (data) => this.adminService.addCategory(this.product.id, category)
          .subscribe({
            next : (data) => this.updateSuccess = true,
            error : (e) => this.handleError(e)
          }),
        error : (e) => this.handleError(e)
      })
      
  }

  handleError(data: any ) {
    this.errorMessage = data.error.message;
  }

}
