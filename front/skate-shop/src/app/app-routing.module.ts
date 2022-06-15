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

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component : SignupComponent},
  { path: 'login', component : LoginComponent},
  { path: 'user-profile/:id', component: UserProfileComponent, canActivate : [IsLoggedGuard]},
  { path: 'user-profile/address/:id', component: AddressComponent, canActivate : [IsLoggedGuard]},
  { path: 'user-profile/pass-change/:id', component: ChangePassComponent, canActivate : [IsLoggedGuard]},
  { path: 'product/:id', component: ProductDetailsComponent},
  { path: 'cart/:id', component: CartComponent, canActivate : [IsLoggedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }