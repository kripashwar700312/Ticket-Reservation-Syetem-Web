import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'base-module/constants/app-routes';
import { PaymentComponent } from './payment.component';

const landingRoutes: Routes = [
    {
        path: "",
        component: PaymentComponent,
        pathMatch: 'full'
    },
    {
        path: AppRoutes.ID,
        pathMatch: 'full',
        component: PaymentComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(landingRoutes)
    ],
    declarations: []
})
export class PaymentRoutingModule { }
