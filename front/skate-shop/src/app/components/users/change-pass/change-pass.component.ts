import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  constructor(public router : Router, private actRoute: ActivatedRoute, private userService : UserService) { 
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.userService.getUserProfile(id).subscribe((res) => {
    console.log(res);
    this.currentUser = res;
    })
    this.passForm = new FormGroup({

  }) }

  ngOnInit(): void {
  }

}
