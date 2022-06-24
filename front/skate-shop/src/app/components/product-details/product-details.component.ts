import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router'; 
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import { UrlService} from 'src/app/_helpers/url.service'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product : any
  user : any
  isConnected : boolean
  public route : ActivatedRouteSnapshot

  constructor( 
    private actRoute: ActivatedRoute,
    public router: Router,
    private productService : ProductService,
    public userService : UserService,
    private tokenStorage : TokenStorageService
    ) 
    {
    this.isConnected = this.tokenStorage.isConnected()

    let id = this.actRoute.snapshot.paramMap.get('id');
    this.productService.getProductById(id).subscribe((res) => {
      this.product = res
      // console.log(this.product);
    })
    this.user = JSON.parse(window.sessionStorage.getItem("auth-user"))
    }

  ngOnInit(): void {
  }

  addToCart(id: any) {
    if (!this.isConnected) {
      this.router.navigate(['/cart/' + this.user?.id]);
    } else {
      this.userService.addProductToCart(id, this.user.id).subscribe((res)=> {
        console.log(res);
      })
    }
  }
  back() {
    history.back()
  }
}
