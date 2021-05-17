import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const landingRoutes: Routes = [
    {
        path: "",
        component: DashboardComponent,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(landingRoutes)
    ],
    declarations: []
})
export class DashboardRoutingModule { }
