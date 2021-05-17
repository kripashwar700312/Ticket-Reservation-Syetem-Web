import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'base-module/constants/app-routes';
import { ToastrService } from 'ngx-toastr';
import { ReservationService } from './service/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  today: Date;
  reservationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.today = new Date();
    this.buildSearchForm();
  }

  buildSearchForm() {
    this.reservationForm = this.formBuilder.group({
      travelMode: "One Way",
      fromCity: "",
      toCity: "",
      departureDate: "",
      returnDate: "",
      departureTime: "",
      returnTime: "",
      kids: "",
      adults: "",
      seniour: ""
    });
  }

  reserve() {
    this.reservationService.reserve(this.reservationForm.value)
      .subscribe(response => {
        this.router.navigate([AppRoutes.PAYMENT, response.data]);
      }, errorResponse => {
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
