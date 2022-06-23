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
  addSuccess = false;
  addNew = true;
  errorMessage! : string;
  brands : any[]
  categories : any[]
  productImage : File;
  imageChoosen = false;

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
        Validators.required,
        Validators.min(1)
      ])),
      promotion: new FormControl (0, Validators.compose([
        Validators.min(0),
        Validators.max(99)
      ])),
      status: new FormControl ('', Validators.compose([
        Validators.required
      ])),
      brands: new FormControl (null),
      category: new FormControl (''),
      stock: new FormControl (0, Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ])),
    });
  }

  ngOnInit(): void {
  }

  addProduct() {
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

    this.adminService.addProduct(productUp)
      .subscribe({
        next : (d) => (this.adminService.addCategory(d.id, category)
          .subscribe({
            next : (data) => (this.addSuccess = true, this.addNew = false),
            error : (e) => this.handleError(e)
          }),
          this.submitProductImage(d.id)
          ),
        error : (e) => this.handleError(e)
      })
  }

  handleError(data: any ) {
    this.errorMessage = data.error.message;
    console.log(this.errorMessage);
  }

  addNewPro() {
    this.addNew = true
  }

  //Upload Image
  fileChoosen(event : any) {
    if(event.target.value) {
      this.productImage = <File>event.target.files[0]
      this.imageChoosen = true
    }
  }

  submitProductImage(productId : any) {
    let fd = new FormData();
    if(this.productImage) {
      fd.append('simple', this.productImage)
      this.adminService.uploadImage(productId, fd).subscribe((res) => {
        console.log(res);
      })
      
    }
  }
}
