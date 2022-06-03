import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(public fb: FormBuilder, private tokenStorage : TokenStorageService) {
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

}
