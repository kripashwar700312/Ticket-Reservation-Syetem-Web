import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppRoutes } from 'base-module/constants/app-routes';
import { ToastrService } from 'ngx-toastr';
import { ReservationService } from '../reservation/service/reservation.service';
import { ReservationResponse } from './models/reservation-response';
import { PaymentService } from './service/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  reservationId: Number;
  reservationResponse: ReservationResponse;
  totalPassenger: Number
  paymentForm: FormGroup = this.formBuilder.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private paymentService: PaymentService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getReservationDetails();
  }

  getReservationDetails() {
    this.route.paramMap.subscribe(params => {
      this.reservationId = +params.get('id');
      this.reservationService.getReservationById(this.reservationId)
        .subscribe(response => {
          this.reservationResponse = response.data;
          this.totalPassenger = this.reservationResponse.kids + this.reservationResponse.adults + this.reservationResponse.seniour;
        },
          errorResponse => {
            if (errorResponse.error && errorResponse.error.message) {
              this.toastr.error(errorResponse.error.message, 'Error Notification');
            } else {
              this.toastr.error('Server Error', 'Error Notification');
            }
          });
    })
  }

  pay() {
    let paymentRequest = { username: this.paymentForm.value.username, password: this.paymentForm.value.password, reservationId: this.reservationId };
    this.paymentService.pay(paymentRequest)
      .subscribe(response => {
        this.reservationResponse.paid = true;
        this.toastr.success(response.message, 'Success Notification');
      },
        errorResponse => {
          if (errorResponse.error && errorResponse.error.message) {
            this.toastr.error(errorResponse.error.message, 'Error Notification');
          } else {
            this.toastr.error('Server Error', 'Error Notification');
          }
        });
  }

  navigateToDashboard() {
    this.router.navigate([AppRoutes.DASHBOARD]);
  }

}
