import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {

  passForm : FormGroup;
  currentUser : any;
  errorMessage! : string;
  passChanged : Boolean = false

  constructor(public router : Router, private actRoute: ActivatedRoute, private userService : UserService) { 
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.userService.getUserProfile(id).subscribe((res) => {
    this.currentUser = res;
    })
    this.passForm = new FormGroup({
      password : new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25)
      ])),
      newPassword : new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25)
      ])),
      newPasswordRepeat : new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25)
      ]))
  }) }

  ngOnInit(): void {
  }

  changePass() {
    this.userService.changePass(this.passForm.value, this.currentUser.id).subscribe({
      next : (data) => this.succesUpdate(),
      error : (e) => this.handleError(e)
    })
  }
  succesUpdate() {
    this.passForm.setValue({password : "", newPassword : "", newPasswordRepeat : ""})
    this.passChanged = true
  }
  handleError(data: any ) {
    this.errorMessage = data.error.message;
    if(data.status === 400) {
      this.passForm.setValue({password : "", newPassword : "", newPasswordRepeat : ""})
    }
  }
}

