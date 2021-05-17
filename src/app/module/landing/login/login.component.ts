import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'base-module/constants/app-routes';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router,

  ) { }

  ngOnInit(): void {
  }

  login() {
    this.loginService.login(this.loginForm.value)
      .subscribe(response => {
        this.toastr.success(response.message, 'Success Notification');
        this.router.navigate([AppRoutes.DASHBOARD]);
      }, errorResponse => {
        if (errorResponse.error) {
          if (errorResponse.error.message) {
            this.toastr.error(errorResponse.error.message, 'Error Notification');
          }
        }
      });
  }

}
