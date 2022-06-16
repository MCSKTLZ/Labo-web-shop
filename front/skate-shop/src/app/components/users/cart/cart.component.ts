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
  subTotal : number
  cart : any
  userId : any

  constructor(
    private userService : UserService,
    private actRoute: ActivatedRoute
    )  
    { 
    this.userId = this.actRoute.snapshot.paramMap.get('id')
    this.userService.getAllCart(this.userId).subscribe((res) => {
      console.log(res);
      this.products = res.cart.Products
      this.cart = res.cart
    })
    
    }

  ngOnInit(): void {
  }

  calcSubtotal() {
    return this.products.reduce((a, b) => a + (b["price"]*b["Cart_Product"].quantity || 0), 0);
  }

  addToCart(id: any) {
    this.userService.addProductToCart(id).subscribe((res) => {
      console.log(res);
      this.userService.getAllCart(this.userId).subscribe((cart) => {
        console.log(cart);
        
      })
    })
  }
  removeFromCart(id: any) {
    this.userService.removeFromCart(id).subscribe((res) => {
      console.log(res);
    })
  }

}
