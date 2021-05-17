import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { LoginService } from '../landing/service/login.service';
import { ReservationService } from '../reservation/service/reservation.service';
import { SharedModule } from 'base-module/shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  providers: [LoginService, ReservationService]
})
export class DashboardModule { }
