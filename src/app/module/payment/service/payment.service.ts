import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from 'base-module/constants/api-constants';
import { ServerResponse } from 'base-module/models/reponse';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentService {

  constructor(private http: HttpClient) {
  }

  private getApiEndPoint() {
    return ApiConstants.ENDPOINT;
  }

  pay(paymentRequest: any): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(this.getApiEndPoint() + ApiConstants.PAYMENT, paymentRequest);
  }
}
