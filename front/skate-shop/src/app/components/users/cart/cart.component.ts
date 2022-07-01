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
  outOfStock : boolean = false

  constructor(
    private userService : UserService,
    private actRoute: ActivatedRoute
    )  
    { 
    this.userId = this.actRoute.snapshot.paramMap.get('id')
    this.getAllCart()
    }

  ngOnInit(): void {
  }

  calcSubtotal() {
    return this.products.reduce((a, b) => a + (b["price"]*b["Cart_Product"].quantity || 0), 0);
  }

  async addToCart(id: any) {
    this.userService.addProductToCart(id, this.userId).subscribe((res) => {
      this.getAllCart();
    })
  }
  async removeFromCart(id: any) {
    this.userService.removeFromCart(id, this.userId).subscribe((res) => {
      this.getAllCart();
    })
  }

  getAllCart() {
    this.userService.getAllCart(this.userId).subscribe((res) => {
      this.products = res.cart.Products
      this.cart = res.cart
    })
  }

  back() {
    history.back()
  }
}
