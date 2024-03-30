import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Users } from '../users.interface';
import { TodoService } from '../todo.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  userData: any;
  mobileMode: any;
  todoUserData: any;
  constructor(
    private userService: UserService,
    private todoService: TodoService
  ) {}
  ngOnInit(): void {
    this.getUserData();
    this.getTodos();
  }
  getUserData() {
    const res = this.userService.getUserData();
    this.mobileMode = this.userService.getMobileMode();
    this.userData = [res];
    console.log(this.userData);
    console.log('mobile', this.mobileMode);
  }
  getTodos() {
    this.todoService.getTodoByUserId(this.userData[0]._id).subscribe({
      next: (res) => {
        this.todoUserData = res;
        console.log(this.todoUserData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getDoneCount(): number {
    return this.todoUserData.filter((todo: any) => todo.status === 'Done')
      .length;
  }
  getActiveCount(): number {
    return this.todoUserData.filter((todo: any) => todo.status === 'Active')
      .length;
  }
  getFailCount(): number {
    return this.todoUserData.filter((todo: any) => todo.status === 'Fail')
      .length;
  }
  getDonePercentage(): number {
    return Math.floor((this.getDoneCount() / this.todoUserData.length) * 100);
  }
  getActivePercentage(): number {
    return Math.floor((this.getActiveCount() / this.todoUserData.length) * 100);
  }
  getFailPercentage(): number {
    return Math.floor((this.getFailCount() / this.todoUserData.length) * 100);
  }
}
