import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products : any[]

  constructor(
    private userService : UserService,
    private actRoute: ActivatedRoute
    )  
    { 
    let id = this.actRoute.snapshot.paramMap.get('id')
    this.userService.getAllCart(id).subscribe((res) => {
      console.log(res);
      this.products = res.cart.Products
    })
    }

  ngOnInit(): void {
  }


}
