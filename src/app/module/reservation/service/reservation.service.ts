import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from 'base-module/constants/api-constants';
import { ServerResponse } from 'base-module/models/reponse';
import { Observable } from 'rxjs';

@Injectable()
export class ReservationService {

  constructor(private http: HttpClient) {
  }

  private getApiEndPoint() {
    return ApiConstants.ENDPOINT;
  }

  reserve(reservationRequest): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(this.getApiEndPoint() + ApiConstants.RESERVATION, reservationRequest);
  }

  getReservationSummary(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.getApiEndPoint() + ApiConstants.RESERVATION);
  }

  getReservationById(id): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(this.getApiEndPoint() + ApiConstants.RESERVATION + ApiConstants.ID, id);
  }
}
