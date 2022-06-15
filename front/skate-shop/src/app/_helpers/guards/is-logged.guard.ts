import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UrlService } from '../url.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {

  constructor ( private tokenStorage : TokenStorageService, private router : Router, private urlService : UrlService) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isConnected =  this.tokenStorage.isConnected();
    if (!isConnected) {
      this.urlService.setPreviousUrl(route.url[0].path)
      this.router.navigate(['/login']);
    }
    return isConnected
  }
  
}
