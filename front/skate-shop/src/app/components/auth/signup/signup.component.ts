import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  isLoggedIn = false;
  isSignupFailed = false;
  errorMessage = '';

  constructor(
    private tokenStorage : TokenStorageService,
    private authService : AuthService,
    public router: Router,
    private toastr : ToastrService
    ) {
      this.tokenStorage.currentUser.subscribe({
        next : (user) => {
          this.isLoggedIn = this.tokenStorage.isConnected()
          if(this.isLoggedIn){
            this.router.navigate(['home']);
          }
        }
      })
      this.signupForm = new FormGroup({
        firstname : new FormControl('', Validators.compose([
          Validators.required,
          Validators.maxLength(20),
        ])),
        lastname : new FormControl('', Validators.compose([
          Validators.required,
          Validators.maxLength(20),
        ])),
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.email,
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(4)
        ])),
      });
   }

  ngOnInit(): void {
  }

  register() {
    this.authService.register(this.signupForm.value).subscribe({
      next : (data) => (
        this.router.navigate(['login']),
        this.toastr.success(data.message + ". Please login now", 'Success')
      ),
      error : (e) => this.handleError(e)
    })
  }
  handleError(data: any ) {
    this.errorMessage = data.error.message;
    this.toastr.error(this.errorMessage, 'Error')
    this.signupForm.reset()
    this.isSignupFailed = true;
  }
}
