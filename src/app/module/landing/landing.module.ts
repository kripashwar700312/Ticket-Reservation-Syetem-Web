import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LandingRoutingModule } from './landing-routing.module';
import { SharedModule } from 'base-module/shared/shared.module';
import { LoginService } from './service/login.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule
  ],
  providers: [LoginService]
})
export class LandingModule { }
