import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'base-module/constants/app-routes';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './module/landing/landing.module#LandingModule'
  },
  {
    path: AppRoutes.DASHBOARD,
    loadChildren: './module/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: AppRoutes.RESERVATION,
    loadChildren: './module/reservation/reservation.module#ReservationModule'
  },
  {
    path: AppRoutes.PAYMENT,
    loadChildren: './module/payment/payment.module#PaymentModule'
  },
  {
    path: '**',
    redirectTo: AppRoutes.LOGIN,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
