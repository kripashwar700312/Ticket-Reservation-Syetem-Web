import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { SharedModule } from 'base-module/shared/shared.module';
import { PaymentRoutingModule } from './payment.routing.module';
import { PaymentService } from './service/payment.service';

@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PaymentRoutingModule
  ],
  providers: [
    PaymentService
  ]
})
export class PaymentModule { }
