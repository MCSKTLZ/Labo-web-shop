import { Component } from '@angular/core';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs';
import { UrlService } from './_helpers/url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'skate-shop';

  previousUrl: string = null;
  currentUrl: string = null;

  constructor(
    private router: Router,
    private urlService : UrlService) 
    {
       // ici ca bug
      
    }

    ngOnInit() {
      
    }
}
