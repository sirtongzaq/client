import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Users } from '../users.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { TodoService } from '../todo.service';
import { Todos } from '../todo.interface';
import { UpdateComponent } from '../update/update.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, UpdateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  isOpenUpdate: boolean = false;
  users: Users[] = [];
  todos: Todos[] = [];
  public searchText: string = '';
  userdata: any;
  selectedTodo: any;
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

  callMultipleFunctions(todo: any): void {
    this.toggleUpdateTodo();
    this.selectTodo(todo);
  }
  toggleUpdateTodo(): void {
    this.isOpenUpdate = !this.isOpenUpdate;
  }
  selectTodo(todo: Todos): void {
    this.selectedTodo = todo;
  }

  getTodoData(): void {
    this.todoService.getTodoByUserId(this.userdata._id).subscribe({
      next: (todos) => {
        this.todos = todos;
      },
      error: (err) => {
        console.log(err);
      },
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

  delTodo(_id: string): void {
    this.todoService.deleteTodo(_id).subscribe({
      next: () => {
        console.log('delete');
        this.todoService.triggerUpdate();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateStatus(_id: string, status: string): void {
    this.todoService.updateStatus(_id, status).subscribe({
      next: () => {
        console.log('update');
        this.todoService.triggerUpdate();
      },
      error: (err) => {
        console.log('error', err);
        this.todoService.triggerUpdate();
      },
    });
  }
}
