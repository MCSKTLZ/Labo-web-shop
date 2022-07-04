import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import {  Router } from '@angular/router';
import { Location } from '@angular/common'
import { Observable } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  public isConnected: boolean = false;
  public isAdmin: boolean = false;
  public cartComplete : Observable<any[]>
  public cart : any[];
  public user : any;
  public userId : any

  constructor(
    private tokenStorage : TokenStorageService, 
    public router : Router, 
    private userService : UserService,
    public location : Location) 
    {
    this.tokenStorage.currentUser.subscribe({
      next : (user) => {
        this.isConnected = this.tokenStorage.isConnected();

        if(this.isConnected) {
          this.userService.cart$.subscribe({
            next : (data) => {
              this.user = user
              this.userId = user.id
              this.cart = data.cart.Products.length
            },
            error : (e) => console.log(e)
          })
        }
        this.isAdmin = this.tokenStorage.isAdmin()
      }
    })
      

      // this.userService.getAllCart(this.user.id).subscribe((res) => {
      //   this.cart = (res.cart.Products.length);
      // })
  }

  ngOnInit(): void {
    
  }

  logout() {
    this.tokenStorage.signOut()
    window.location.reload()
  }
  redirectUserProfile() {
    this.router.navigate(['user-profile/' + this.user.id])
  }

  getAllCart() {
    this.userService.getAllCart(this.userId).subscribe((res) => {
      this.cart = res.cart
    })
  }
  
}
