import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../user.service';
import { Users } from '../users.interface';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordMatch: boolean = false;
  validate: boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  register() {
    if (!this.passwordMatch) {
      alert('Passwords do not match.');
      return;
    }
    if (!this.validate) {
      alert('Please fill in all required fields.');
      return;
    }
    const user: Users = {
      username: this.username,
      email: this.email,
      password: this.password,
      _id: '',
      createdAt: '',
    };
    this.userService.addUser(user).subscribe((res) => {
      console.log(res);
    });
  }

  validateAll(): void {
    this.validate =
      this.username !== '' &&
      this.email !== '' &&
      this.password !== '' &&
      this.confirmPassword !== '';
  }
  validatePassword(): void {
    this.passwordMatch = this.password === this.confirmPassword;
  }
}
