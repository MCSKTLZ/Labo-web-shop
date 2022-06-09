import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  public isConnected: boolean = false;
  public isAdmin: boolean = false;

  constructor(private tokenStorage : TokenStorageService, public router : Router) {
    this.tokenStorage.currentUser.subscribe({
      next : (user) => {
        this.isConnected = this.tokenStorage.isConnected();
        this.isAdmin = this.tokenStorage.isAdmin()
      }
  })
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
