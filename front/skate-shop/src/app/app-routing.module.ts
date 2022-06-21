import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AddressComponent } from './components/users/address/address.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';
import { ChangePassComponent } from './components/users/change-pass/change-pass.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/users/cart/cart.component';
import { IsLoggedGuard } from './_helpers/guards/is-logged.guard';
import { IsAdminGuard } from './_helpers/guards/is-admin.guard';
import { UpdateProductComponent } from './components/admin/update-product/update-product.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { AddCatBrandComponent } from './components/admin/add-cat-brand/add-cat-brand.component';

const routes: Routes = [

  // all routes

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component : SignupComponent},
  { path: 'login', component : LoginComponent},

  //logged routes

  { path: 'user-profile/:id', component: UserProfileComponent, canActivate : [IsLoggedGuard]},
  { path: 'user-profile/address/:id', component: AddressComponent, canActivate : [IsLoggedGuard]},
  { path: 'user-profile/pass-change/:id', component: ChangePassComponent, canActivate : [IsLoggedGuard]},
  { path: 'product/:id', component: ProductDetailsComponent},
  { path: 'cart/:id', component: CartComponent, canActivate : [IsLoggedGuard]},

  //Admin routes

  { path: 'admin/update-product/:id', component: UpdateProductComponent, canActivate : [IsAdminGuard]},
  { path: 'admin/add-product', component: AddProductComponent, canActivate : [IsAdminGuard]},
  { path: 'admin/add-cat-brand', component: AddCatBrandComponent, canActivate : [IsAdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }