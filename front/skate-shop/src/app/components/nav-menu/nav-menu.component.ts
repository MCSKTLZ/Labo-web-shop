import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  public isConnected: boolean = false;
  public isAdmin: boolean = false;
  public cart : any;
  public user : any

  constructor(private tokenStorage : TokenStorageService, public router : Router, private userService : UserService) {
    this.tokenStorage.currentUser.subscribe({
      next : (user) => {
        this.isConnected = this.tokenStorage.isConnected();
        this.isAdmin = this.tokenStorage.isAdmin()
        this.user = user
      }
  })
  if(this.isConnected) {
    this.userService.getAllCart(this.user.id).subscribe((res) => {
      this.cart = (res.cart.Products.length);
    })
  }
}

  ngOnInit(): void {
  }

  logout() {
    this.tokenStorage.signOut()
  }
  redirectUserProfile() {
    this.router.navigate(['user-profile/' + this.tokenStorage.getUser().id])
  }
}
