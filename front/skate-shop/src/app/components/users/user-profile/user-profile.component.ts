import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import localeFr from '@angular/common/locales/fr';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUser: any;
  constructor(
    private actRoute: ActivatedRoute,
    public router: Router,
    private userService : UserService,
    private tokenStorage : TokenStorageService

  ) {

  }
  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.userService.getUserProfile(id).subscribe((res) => {
      console.log(res);
      this.currentUser = res;
    });
  }

}
