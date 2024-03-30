import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { Users } from './users.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = 'http://localhost:3000';
  private apiUrl = 'https://server-pw6s.onrender.com';
  constructor(private http: HttpClient) {}

  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>(`${this.apiUrl}/auth/register`, user);
  }

  login(username: string, password: string): Observable<HttpResponse<any>> {
    const body = { username, password };

    return this.http.post<any>(`${this.apiUrl}/auth/login`, body, {
      observe: 'response',
    });
  }

  getUserByToken(): Observable<any> {
    const token = localStorage.getItem('x-token-acesss');
    if (!token) {
      return throwError('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/auth/getuserbytoken`, {
      headers,
    });
  }

  logout() {
    localStorage.removeItem('x-token-acesss');
  }
}
