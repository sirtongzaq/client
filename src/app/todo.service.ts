import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Todos } from './todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  
  private updateSubject = new BehaviorSubject<boolean>(false);
  update$ = this.updateSubject.asObservable();

  triggerUpdate() {
    this.updateSubject.next(true);
  }

  getTodos(): Observable<Todos[]> {
    return this.http.get<Todos[]>(`${this.apiUrl}/todo/gettodo`);
  }

  createTodos(todos: Todos): Observable<Todos> {
    return this.http.post<Todos>(`${this.apiUrl}/todo/create`, todos);
  }
}
