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
  isAdmin : boolean
  userId : any
  productAdded : string = null
  errorMessage : string =  null
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
    if(this.isConnected){
      this.isAdmin = this.tokenStorage.isAdmin()
      this.userId = this.tokenStorage.currentUserValue.id
      this.user = JSON.parse(window.sessionStorage.getItem("auth-user"))
      this.getAllCart()
    }

    
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.productService.getProductById(id).subscribe((res) => {
      this.product = res
      console.log(this.product);
    })
    
    }

  ngOnInit(): void {
  }

  addToCart(id: any) {
    if (!this.isConnected) {
      this.router.navigate(['/cart/' + this.user?.id]);
    } else {
      this.userService.addProductToCart(id, this.user.id).subscribe(
        {
          next : (data) => {            
            this.productAdded = data.message
            this.getAllCart()
          },
          error : (err) => {
            this.productAdded = null
            this.errorMessage = err.error.message
          },
        }
      )
    }
  }

  getAllCart() {
    this.userService.getAllCart(this.userId).subscribe((res) => {
      console.log("cart loaded");
      
    })
  }

  back() {
    history.back()
  }
}
