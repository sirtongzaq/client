import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from './users.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';
  private userData: any;
  private mobileMode: any;
  constructor(private http: HttpClient) {}

  setUserData(userData: any) {
    this.userData = userData;
  }

  getUserData() {
    return this.userData;
  }

  setMobileMode(mobileMode: any) {
    this.mobileMode = mobileMode;
  }

  getMobileMode() {
    return this.mobileMode;
  }
}
