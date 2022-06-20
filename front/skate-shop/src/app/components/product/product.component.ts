import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() Item : any
  @Input() calcPromo : any
  @Input() isAdmin : boolean

  constructor(
    public router : Router
  ) { 

   }

  ngOnInit(): void {

    }
  
  updateProduct(id: any) {
    this.router.navigate(["admin/update-product/"+ id])
  }
}
