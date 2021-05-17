import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './reservation.component';

const landingRoutes: Routes = [
    {
        path: "",
        component: ReservationComponent,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(landingRoutes)
    ],
    declarations: []
})
export class ReservationRoutingModule { }
