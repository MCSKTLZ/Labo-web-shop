import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private previousUrl: BehaviorSubject<string>
  public previousUrl$: Observable<string> 
  

  constructor() 
  { 
    this.previousUrl = new BehaviorSubject<string>(null);
    this.previousUrl$ = this.previousUrl.asObservable()
  }

  setPreviousUrl(previousUrl: string) {
    this.previousUrl.next(previousUrl);
  }
}
