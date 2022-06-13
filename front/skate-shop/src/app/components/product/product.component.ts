import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() Item : any
  @Input() calcPromo : any

  constructor() { 

   }

  ngOnInit(): void {

    }

}
