import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.scss']
})
export class NavUserComponent implements OnInit {

  currentUser : any;

  constructor(public router : Router, private tokenStorage : TokenStorageService) {
    this.tokenStorage.currentUser.subscribe((res) => {
      this.currentUser = res;
    })
   }

  ngOnInit(): void {

  }

  redirecToUserProfile(){
    this.router.navigate(['user-profile/' + this.currentUser.id])
  }
  redirecToUserAddress(){
    this.router.navigate(['user-profile/address/' + this.currentUser.id])
  }
  redirecToUserPassChange(){
    this.router.navigate(['user-profile/pass-change/' + this.currentUser.id])
  }

}
