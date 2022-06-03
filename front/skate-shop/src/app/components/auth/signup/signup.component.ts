import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    this.signupForm = this.fb.group({
      firstname : [''],
      lastname : [''],
      email: [''],
      password: [''],
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
