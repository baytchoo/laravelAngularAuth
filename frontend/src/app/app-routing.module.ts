import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {ResetRequestComponent} from './components/password/reset-request/reset-request.component';
import {ResetResponseComponent} from './components/password/reset-response/reset-response.component';
import {ProfileComponent} from './components/profile/profile.component';
import { BeforeLoginService } from './Services/before-login.service';
import { AfterLoginService } from './Services/after-login.service';
import { TestComponent } from './tests/test.component';




const appRoutes: Routes = [
  { 
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService]
  },
  { 
    path: 'signup',
    component: SignupComponent,
    canActivate: [BeforeLoginService]
  },
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [AfterLoginService]
  },
  { 
    path: 'request-password-reset', 
    component: ResetRequestComponent,
    canActivate: [BeforeLoginService]
  },
  { 
    path: 'response-password-reset', 
    component: ResetResponseComponent,
    canActivate: [BeforeLoginService]
  },
  // { 
  //   path: 'test', 
  //   component: TestComponent
  // },
  ]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: []
})
export class AppRoutingModule { }
