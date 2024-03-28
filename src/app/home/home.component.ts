import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Users } from '../users.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  users: Users[] = [];
  public searchText: string = '';

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  searchUsers(): void {
    if (!this.searchText.trim()) {
      // this.getUsers();
      this.users = [];
      return;
    }
    this.userService.getUsers().subscribe((users) => {
      this.users = users.filter((user) =>
        user.username
          .toLowerCase()
          .includes(this.searchText.trim().toLowerCase())
      );
    });
  }
}
