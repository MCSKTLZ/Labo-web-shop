import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { UrlService } from 'src/app/_helpers/url.service';
import { filter, Observable } from 'rxjs';
import { Location } from '@angular/common'

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  public isConnected: boolean = false;
  public isAdmin: boolean = false;
  public cart : any;
  public user : any;

  previousUrl: string = null
  previousNavigation: any

  constructor(
    private tokenStorage : TokenStorageService, 
    public router : Router, 
    private userService : UserService,
    private urlService : UrlService,
    public location : Location) 
    {
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
    this.urlService.previousUrl$.subscribe((previousUrl : string) => {
      this.previousUrl = previousUrl
      console.log('previous url :', this.previousUrl);
    })
  }

  logout() {
    this.tokenStorage.signOut()
  }
  redirectUserProfile() {
    this.router.navigate(['user-profile/' + this.user.id])
  }
  
}
