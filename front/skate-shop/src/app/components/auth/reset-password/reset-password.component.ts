import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  passwordReseted = false
  errorMessage : string = null
  passForm!: FormGroup;
  id : any;
  token : any;

  constructor( 
    private actRoute: ActivatedRoute,
    private authService : AuthService,
    private toastr : ToastrService
    ) { 
      this.passForm = new FormGroup({
        password : new FormControl ('', Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ])),
        confirmPassword : new FormControl ('', Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ])),
      })

      this.id = this.actRoute.snapshot.paramMap.get('id');
      this.token = this.actRoute.snapshot.paramMap.get('token');
      // console.log(this.id);
      // console.log(this.token);
  }

  ngOnInit(): void {
  }

  sendResetPassword() {
    this.authService.resetPassword(this.id, this.token, this.passForm.value).subscribe(
      {
        next : (data) => (
          this.passwordReseted = true,
          this.errorMessage = null,
          this.passForm.reset()),
        error : (e) => this.handleError(e)
      }
    )
  }

  handleError(data: any ) {
    this.errorMessage = data.error.message
    this.toastr.error(this.errorMessage, 'Error')
    this.passForm.reset()
    this.passwordReseted = false
  }

}
