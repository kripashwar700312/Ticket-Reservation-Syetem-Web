import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from 'base-module/constants/api-constants';
import { ServerResponse } from 'base-module/models/reponse';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {
  }

  private getApiEndPoint() {
    return ApiConstants.ENDPOINT;
  }

  login(loginForm: any): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(this.getApiEndPoint() + ApiConstants.AUTHENTICATION, loginForm);
  }

  logout(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.getApiEndPoint() + ApiConstants.AUTHENTICATION + ApiConstants.LOGOUT);
  }
}
