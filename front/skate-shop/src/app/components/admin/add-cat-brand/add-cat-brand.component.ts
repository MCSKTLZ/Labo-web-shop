import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-add-cat-brand',
  templateUrl: './add-cat-brand.component.html',
  styleUrls: ['./add-cat-brand.component.scss']
})
export class AddCatBrandComponent implements OnInit {

  addCatForm!: FormGroup;
  addBrandForm!: FormGroup;
  brandCreated = false;
  catCreated = false;
  catMessage = '';
  brandMessage = '';

  constructor(private adminService : AdminService) {

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
      this.catCreated = true ;
      this.addCatForm.patchValue({newCategory : ''})
    })
  }

  createBrand() {
    let newBrand = { name : this.addBrandForm.value.newBrand}
    this.adminService.createBrand(newBrand).subscribe((res) => {
      this.brandMessage = res.message
      this.brandCreated = true;
      this.addBrandForm.patchValue({newBrand : ''})
    })
  }

}
