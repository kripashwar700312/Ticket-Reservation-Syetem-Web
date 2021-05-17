import { Injectable, Optional, Inject } from '@angular/core';
import { SessionStorageConstants } from '../constants/session-storage-constants';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthorizationService {

  public token: string;

  constructor(
    private http: HttpClient,
    @Inject('endpoint') @Optional() public endpoint?: string,
  ) {
    this.endpoint = endpoint;
  }

  private getApiEndPoint() {
    return this.endpoint;
  }

  setToken(authToken) {
    localStorage.setItem(SessionStorageConstants.Authorization, authToken);
  }

  getToken() {
    return localStorage.getItem(SessionStorageConstants.Authorization);
  }

  isAuthenticated(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    return true;
  }

  removeToken() {
    localStorage.removeItem(SessionStorageConstants.Authorization);
    localStorage.clear();
  }
}
