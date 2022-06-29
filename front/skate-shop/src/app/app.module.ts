import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { FooterComponent } from './components/footer/footer.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AddressComponent } from './components/users/address/address.component';
import { NavUserComponent } from './components/users/nav-user/nav-user.component';
import { ChangePassComponent } from './components/users/change-pass/change-pass.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/users/cart/cart.component';
import { UpdateProductComponent } from './components/admin/update-product/update-product.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { AddCatBrandComponent } from './components/admin/add-cat-brand/add-cat-brand.component';
import { PasswordResetMailerComponent } from './components/auth/password-reset-mailer/password-reset-mailer.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FooterComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    UserProfileComponent,
    AddressComponent,
    NavUserComponent,
    ChangePassComponent,
    ProductComponent,
    ProductDetailsComponent,
    CartComponent,
    UpdateProductComponent,
    AddProductComponent,
    AddCatBrandComponent,
    PasswordResetMailerComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
