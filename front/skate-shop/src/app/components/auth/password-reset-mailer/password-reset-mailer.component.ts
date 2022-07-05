import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastrService } from 'ngx-toastr';


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

  constructor(
    private authService : AuthService,
    private toastr : ToastrService
    ) {
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
        next : (data) => (
          this.toastr.success(`Email sent to ${this.email}`, 'Success'),
          this.errorMessage = null,
          this.waitingForMail = false
          ),
        error : (e) => (
          this.handleError(e),
          this.waitingForMail = false
          )
      })
  }

  handleError(data: any ) {
    this.errorMessage = data.error;
    this.toastr.error(this.errorMessage, 'Error')
    this.emailSent = false;
  }
}
