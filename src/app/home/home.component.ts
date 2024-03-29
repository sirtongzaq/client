import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Users } from '../users.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { TodoService } from '../todo.service';
import { Todos } from '../todo.interface';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  users: Users[] = [];
  todos: Todos[] = [];
  public searchText: string = '';
  userdata: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.getTodoData();
    this.todoService.update$.subscribe(() => {
      this.getTodoData();
    });
  }

  getTodoData(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos.filter((todo) => todo.user_id == this.userdata._id);
    });
  }

  getUserData(): void {
    this.userdata = this.userService.getUserData();
  }

  searchUsers(): void {
    if (!this.searchText.trim()) {
      this.getTodoData();
      return;
    }
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(this.searchText.trim().toLowerCase())
      );
    });
  }
}
