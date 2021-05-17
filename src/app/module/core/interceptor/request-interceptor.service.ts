import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { AuthorizationService } from 'base-module/service/authorization.service';
import { AppRoutes } from 'base-module/constants/app-routes';
import { SessionStorageConstants } from 'base-module/constants/session-storage-constants';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

  clonedRequest: HttpRequest<any>;

  constructor(private authService: AuthorizationService,
    private router: Router,
    private toastr: ToastrService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${this.authService.getToken()}`) });
    this.clonedRequest = request.clone({});
    if (this.authService.getToken() != null && this.router.url.includes(AppRoutes.LOGIN)) {
      this.router.navigate([AppRoutes.DASHBOARD]);
    }

    return next.handle(this.clonedRequest)
      .do(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.headers.get(SessionStorageConstants.Authorization)) {
              this.authService.setToken(event.headers.get(SessionStorageConstants.Authorization));
            }
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status) {
              switch (error.status) {
                case 401:
                  this.redirectToLoginPage();
                  if (error.error) {
                    if (error.error.message && error.error.title) {
                      this.toastr.error(error.error.message, error.error.title);
                    } else if (error.error.message) {
                      this.toastr.error(error.error.message);
                    }
                  }
                  break;
              }
            }
            else {
              this.redirectToLoginPage();
              this.toastr.error("Connection Failed.", "Error Notification");
            }
          }
        }
      );
  }

  private redirectToLoginPage() {
    this.authService.removeToken();
    this.router.navigate([AppRoutes.LOGIN]);
  }
}
