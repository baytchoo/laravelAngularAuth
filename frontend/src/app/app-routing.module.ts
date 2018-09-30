import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {ResetRequestComponent} from './components/password/reset-request/reset-request.component';
import {ResetResponseComponent} from './components/password/reset-response/reset-response.component';
import {ProfileComponent} from './components/profile/profile.component';




const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'request-password-reset', component: ResetRequestComponent },
  { path: 'response-password-reset', component: ResetResponseComponent },
  ]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: []
})
export class AppRoutingModule { }
