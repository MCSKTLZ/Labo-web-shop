import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role!: string;

  constructor(public fb: FormBuilder, private tokenStorage : TokenStorageService) {
      this.tokenStorage.currentUser.subscribe({
        next : (user) => {
          this.isLoggedIn = this.tokenStorage.isConnected();
        }
    })
      this.signinForm = this.fb.group({
        email: [''],
        password: [''],
      });
     }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
    }
  }
  loginUser() {
    this.tokenStorage.login(this.signinForm.value).subscribe(
      {
        next : (data) => this.storageLogin(data),
        error : (e) => this.handleError(e)
      })
  }
  reloadPage(): void {
    window.location.reload();
  }
  storageLogin(data : any) {
    this.tokenStorage.saveToken(data.accessToken)
    this.tokenStorage.saveUser(data);
    this.isLoginFailed = false;
    this.role = this.tokenStorage.getUser().role;
    this.reloadPage();
  }
  handleError(data: any ) {
    this.errorMessage = data.error.message;
    this.isLoginFailed = true;
  }
}
