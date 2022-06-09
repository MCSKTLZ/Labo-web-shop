import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { UserService } from 'src/app/_services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import localeFr from '@angular/common/locales/fr';
import { AuthService } from 'src/app/_services/auth.service';

registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUser: any;
  userForm!: FormGroup;
  updateSuccess = false;
  errorMessage! : string;
  constructor(
    private actRoute: ActivatedRoute,
    public router: Router,
    private userService : UserService,
    public fb: FormBuilder,
    private authService : AuthService
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.userService.getUserProfile(id).subscribe((res) => {
    console.log(res);
    this.currentUser = res;
    let date = new Date(this.currentUser.createdAt)
    let newDate = date.toLocaleDateString()
    
    this.userForm.patchValue({
      email : this.currentUser.email,
      firstname : this.currentUser.firstname,
      lastname : this.currentUser.lastname,
      role : this.currentUser.Role.role,
      createdAt : newDate
    })
    });
    this.userForm = new FormGroup({
      email: new FormControl ('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      firstname: new FormControl ('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12)
      ])),
      lastname: new FormControl ('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12)
      ])),
      role: new FormControl (''),
      createdAt: new FormControl ('')
    });
    this.userForm.get('createdAt').disable()
    this.userForm.get('role').disable()
  }
  ngOnInit(): void {
  }

  updateUser() {
    this.authService.updateUser(this.userForm.value, this.currentUser.id).subscribe({
      next : (data) => this.updateSuccess = true,
      error : (e) => this.handleError(e)
    })
  }

  handleError(data: any ) {
    this.errorMessage = data.error.message;
  }

  // nav user
  redirecToUserProfile(){
    this.router.navigate(['user-profile/' + this.currentUser.id])
  }
  redirecToUserAddress(){
    this.router.navigate(['user-profile/address/' + this.currentUser.id])
  }
}
