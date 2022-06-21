import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
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
  brands : any[]
  categories : any[]

  constructor(
    private actRoute: ActivatedRoute,
    public router: Router,
    private productService : ProductService,
    public fb: FormBuilder,
    private adminService : AdminService
  ) { 
    let id = actRoute.snapshot.paramMap.get('id')
    this.productService.getProductById(id).subscribe((res) => {
      this.product = res
      
      // update form with currentuser Value 
      this.productForm.patchValue({
        productName : this.product.name,
        description : this.product.description,
        price : this.product.price,
        promotion : this.product.promo,
        status : this.product.status,
        stock :  this.product.stock
      })
      if(this.product.BrandId) {
        this.productForm.patchValue({
          brands : this.product.Brand.id,
        })
      if(this.product.Categories.length > 0){
        this.productForm.patchValue({
          category : this.product.Categories[0].id
        })
      }
      }
    })

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
