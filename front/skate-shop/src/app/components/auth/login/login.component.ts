import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/_helpers/url.service';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage! : string;
  role!: string;
  previousUrl : string;
  conMessage : string;
  userId : any;

  constructor(
      private tokenStorage : TokenStorageService,
      public router: Router,
      private urlService : UrlService,
      private userService : UserService,
      private toastr: ToastrService
      ) {
      this.tokenStorage.currentUser.subscribe({
        next : (user) => {
          this.isLoggedIn = this.tokenStorage.isConnected();
        }
    })
      this.signinForm = new FormGroup({
        email : new FormControl ('', Validators.compose([
          Validators.required,
          Validators.email
        ])),
        password : new FormControl ('' , Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ]))
      });
     }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
    }
    this.urlService.previousUrl$.subscribe((previousUrl : string) => {
      this.previousUrl = previousUrl
      console.log('previous url :', this.previousUrl);
    })
  }
  loginUser() {
    this.tokenStorage.login(this.signinForm.value).subscribe(
      {
        next : (data) => {
          this.storageLogin(data)
        } ,
        error : (e) => this.handleError(e)
      })
  }
  storageLogin(data : any) {
    this.tokenStorage.saveToken(data.accessToken)
    this.tokenStorage.saveUser(data);
    this.isLoginFailed = false;
    this.role = this.tokenStorage.getUser().role;
    this.userId = this.tokenStorage.getUser().id
    this.getAllCart()
    this.toastr.success('You are logged in', 'Success')
    this.router.navigate(['home']);
  }

  getAllCart() {
    this.userService.getAllCart(this.userId).subscribe((res) => {
      console.log(res);
      
    })
  }
  handleError(data: any ) {
    this.errorMessage = data.error.message;
    this.toastr.error(this.errorMessage, 'Error')
    this.isLoginFailed = true;
  }
}
