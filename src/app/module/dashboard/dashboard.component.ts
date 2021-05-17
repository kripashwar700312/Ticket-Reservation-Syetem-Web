import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'base-module/constants/app-routes';
import { ReservationSmmary } from 'src/app/module/dashboard/models/reservation-summary';
import * as d3 from 'd3';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../landing/service/login.service';
import { ReservationService } from '../reservation/service/reservation.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  reservationSmmary: Array<ReservationSmmary> = [];

  private svg;
  private colors;

  constructor(
    private loginService: LoginService,
    private reservationService: ReservationService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getReservationSummary();
  }

  getReservationSummary() {
    this.reservationService.getReservationSummary()
      .subscribe(response => {
        this.reservationSmmary = response.data;
        this.reservationSmmary.forEach((summary) => {
          let data = [];
          if (summary.kids) {
            let kids = { "AgeCategory": "Kids(" + summary.kids + ")", "Stars": summary.kids };
            data.push(kids);
          }

          if (summary.adults) {
            let adults = { "AgeCategory": "Adults(" + summary.adults + ")", "Stars": summary.adults };
            data.push(adults);
          }

          if (summary.seniours) {
            let seniours = { "AgeCategory": "Seniours(" + summary.seniours + ")", "Stars": summary.seniours }
            data.push(seniours);
          }
          let width = 300;
          let height = 270;
          let margin = 40;
          this.createSvg(width, height);
          let radius = Math.min(width, height) / 2 - margin;
          this.createColors(data);
          this.drawChart(data, radius);
        });
      }, errorResponse => {
        if (errorResponse.error && errorResponse.error.message) {
          this.toastr.error(errorResponse.error.message, 'Error Notification');
        } else {
          this.toastr.error('Server Error', 'Error Notification');
        }
      });
  }

  private createSvg(width, height): void {
    this.svg = d3.select("figure#pie")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr(
        "transform",
        "translate(" + width / 2 + "," + height / 2 + ")"
      );
  }

  private createColors(data): void {
    this.colors = d3.scaleOrdinal()
      .domain(data.map(d => d.Stars.toString()))
      .range(["#EE1414", "#095FF5", "#09F509"]);
  }

  private drawChart(data, radius): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.Stars));

    // Build the pie chart
    this.svg
      .selectAll('pieces')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
      )
      .attr('fill', (d, i) => (this.colors(i)))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc()
      .innerRadius(40)
      .outerRadius(radius);

    this.svg
      .selectAll('pieces')
      .data(pie(data))
      .enter()
      .append('text')
      .text(d => d.data.AgeCategory)
      .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 12);
  }

  logout() {
    this.loginService.logout()
      .subscribe(response => {
        this.toastr.success(response.message, 'Success Notification');
        this.router.navigate([AppRoutes.LOGIN]);
      }, errorResponse => {
        if (errorResponse.error && errorResponse.error.message) {
          this.toastr.error(errorResponse.error.message, 'Error Notification');
        } else {
          this.toastr.error('Server Error', 'Error Notification');
        }
      });
  }

  navigateToReservationForm() {
    this.router.navigate([AppRoutes.RESERVATION]);
  }
}
