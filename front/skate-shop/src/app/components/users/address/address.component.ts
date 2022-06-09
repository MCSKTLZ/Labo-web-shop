import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  addressForm!: FormGroup;
  address : any;
  currentUser : any;
  addressSuccess = false;
  errorMessage = '';
  constructor(
    private actRoute: ActivatedRoute,
    public router: Router,
    private userService : UserService,
    public fb: FormBuilder,
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.userService.getUserProfile(id).subscribe((res) => {
    this.currentUser = res;
    this.address = this.currentUser.Address
    console.log(this.address);
    
    //update form with address
    this.addressForm.patchValue({
      country : this.address.country,
      city : this.address.city,
      box : this.address.box,
      number : this.address.number,
      zip : this.address.zip,
      street : this.address.street
    })

   })
    this.addressForm = new FormGroup({
      country : new FormControl ('' , Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      city : new FormControl ('' , Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      number : new FormControl ('' , Validators.compose([
        Validators.required
      ])),
      zip : new FormControl ('' , Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      street : new FormControl ('' , Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      box : new FormControl ('')
    })
  }

  ngOnInit(): void {
  }

  registerAddress() {
    console.log(this.addressForm.value);
    
    this.userService.updateUserAddress(this.addressForm.value, this.currentUser.id).subscribe({
      next : (data) => this.addressSuccess = true,
      error : (e) => this.handleError(e)
    })
  }

  handleError(data: any ) {
    this.errorMessage = data.error.message;
  }
}
