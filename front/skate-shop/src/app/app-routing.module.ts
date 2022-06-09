import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AddressComponent } from './components/users/address/address.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component : SignupComponent},
  { path: 'login', component : LoginComponent},
  { path: 'user-profile/:id', component: UserProfileComponent},
  { path: 'user-profile/address/:id', component: AddressComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }