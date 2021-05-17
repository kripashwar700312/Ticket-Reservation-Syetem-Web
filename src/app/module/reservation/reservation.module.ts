import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation.component';
import { SharedModule } from 'base-module/shared/shared.module';
import { ReservationService } from './service/reservation.service';
import { ReservationRoutingModule } from './reservation.routing.module';

@NgModule({
  declarations: [ReservationComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReservationRoutingModule
  ],
  providers: [
    ReservationService
  ]
})
export class ReservationModule { }
