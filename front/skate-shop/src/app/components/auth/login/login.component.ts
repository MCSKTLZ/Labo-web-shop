import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm!: FormGroup;

  constructor(public fb: FormBuilder,
    public authService: AuthService) {
      this.signinForm = this.fb.group({
        email: [''],
        password: [''],
      });
     }

  ngOnInit(): void {
  }
  loginUser() {
    console.log(this.signinForm.value);
    
    this.authService.signIn(this.signinForm.value);
  }

}
