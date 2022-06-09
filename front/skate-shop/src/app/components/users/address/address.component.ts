import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { UserService } from 'src/app/_services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  constructorcurrentUser: any;
  userForm!: FormGroup;
  currentUser : any;
  constructor(
    private actRoute: ActivatedRoute,
    public router: Router,
    private userService : UserService,
    public fb: FormBuilder,
    private tokenStorage : TokenStorageService

  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.userService.getUserProfile(id).subscribe((res) => {
    console.log(res);
    this.currentUser = res;
    console.log(this.currentUser);
   })
  }

  ngOnInit(): void {
  }

  redirecToUserProfile(){
    this.router.navigate(['user-profile/' + this.currentUser.id])
  }
  redirecToUserAddress(){
    this.router.navigate(['user-profile/address/' + this.currentUser.id])
  }
}
