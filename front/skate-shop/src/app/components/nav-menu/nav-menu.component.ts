import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  public isConnected: boolean = false;

  constructor(private tokenStorage : TokenStorageService) {
    this.tokenStorage.currentUser.subscribe({
      next : (user) => {
        this.isConnected = this.tokenStorage.isConnected();
      }
  })
}

  ngOnInit(): void {
  }

  logout() {
    this.tokenStorage.signOut()
  }
}
