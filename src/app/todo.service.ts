import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Todos } from './todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // private apiUrl = 'http://localhost:3000';
  private apiUrl = 'https://server-pw6s.onrender.com';
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

  getTodoByUserId(_id: string): Observable<Todos[]> {
    return this.http.get<Todos[]>(`${this.apiUrl}/todo/gettodobyuserid`, {
      params: { id: _id },
    });
  }

  deleteTodo(_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/todo/delete`, {
      params: { id: _id },
    });
  }

  updateStatus(_id: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/todo/updatestatus`, {
      id: _id,
      status: status,
    });
  }

  updateTodo(
    _id: string,
    title: string,
    desc: string,
    status: string,
    finishAt: Date
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/todo/update`, {
      _id: _id,
      title: title,
      desc: desc,
      status: status,
      finishAt: finishAt,
    });
  }
}
