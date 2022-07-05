import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/_services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-cat-brand',
  templateUrl: './add-cat-brand.component.html',
  styleUrls: ['./add-cat-brand.component.scss']
})
export class AddCatBrandComponent implements OnInit {

  addCatForm!: FormGroup;
  addBrandForm!: FormGroup;
  catMessage = '';
  brandMessage = '';

  constructor(
    private adminService : AdminService,
    private toastr: ToastrService
    ) {

    this.addCatForm = new FormGroup({
      newCategory : new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25)
      ]) )
    })
    this.addBrandForm = new FormGroup({
      newBrand : new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25)
      ]) )
    })
   }

  ngOnInit(): void {
  }

  
  createCat() {  
    let newCat = { name : this.addCatForm.value.newCategory}
    this.adminService.createCat(newCat).subscribe((res) => {
      this.catMessage = res.message
      this.addCatForm.patchValue({newCategory : ''})
      this.toastr.success('Category successfully added', 'Success')
    })
  }

  createBrand() {
    let newBrand = { name : this.addBrandForm.value.newBrand}
    this.adminService.createBrand(newBrand).subscribe((res) => {
      this.brandMessage = res.message
      this.addBrandForm.patchValue({newBrand : ''})
      this.toastr.success('Brand successfully added', 'Success')
    })
  }

}
