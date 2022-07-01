import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-password-reset-mailer',
  templateUrl: './password-reset-mailer.component.html',
  styleUrls: ['./password-reset-mailer.component.scss']
})
export class PasswordResetMailerComponent implements OnInit {

  passForm!: FormGroup;
  errorMessage : string = null;
  emailSent  = false;
  email : string;
  waitingForMail : boolean = false

  constructor(private authService : AuthService) {
    this.passForm = new FormGroup({
      email : new FormControl ('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
    })
  }


  ngOnInit(): void {
  }

  sendResetMail() {
    this.waitingForMail = true
    this.email = this.passForm.value.email
    this.authService.sendMailReset(this.email).subscribe(
      {
        next : (data) => (this.emailSent = true, this.errorMessage = null, this.waitingForMail = false ),
        error : (e) => this.handleError(e)
      })
  }

  handleError(data: any ) {
    this.errorMessage = data.error;
    this.emailSent = false;
  }
}
