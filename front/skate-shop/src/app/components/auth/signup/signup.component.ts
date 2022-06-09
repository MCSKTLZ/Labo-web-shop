import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

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

  constructor(public fb: FormBuilder, private tokenStorage : TokenStorageService, private authService : AuthService,public router: Router) {
    this.tokenStorage.currentUser.subscribe({
      next : (user) => {
        this.isLoggedIn = this.tokenStorage.isConnected();
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

  logout () {
    this.tokenStorage.signOut()
  }

  register() {
    this.authService.register(this.signupForm.value).subscribe({
      next : (data) => this.router.navigate(['login']),
      error : (e) => this.handleError(e)
    })
  }
  handleError(data: any ) {
    this.errorMessage = data.error.message;
    this.isSignupFailed = true;
  }
}
