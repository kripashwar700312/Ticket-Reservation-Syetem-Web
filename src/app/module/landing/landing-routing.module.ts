import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'base-module/constants/app-routes';
import { LoginComponent } from './login/login.component';

const landingRoutes: Routes = [
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: AppRoutes.LOGIN,
        component: LoginComponent,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(landingRoutes)
    ],
    declarations: []
})
export class LandingRoutingModule { }
