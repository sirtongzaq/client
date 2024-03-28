import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from './users.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiUrl}/auth/getuser`);
  }

  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>(`${this.apiUrl}/auth/register`, user);
  }
}
