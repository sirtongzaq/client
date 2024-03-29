import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { Users } from '../users.interface';
import Swal from 'sweetalert2';

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
  constructor(
    private authService: AuthService,
    private route: Router,
    private location: Location
  ) {}

  ngOnInit(): void {}

  register() {
    if (!this.validate) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill all required',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    if (!this.passwordMatch) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Passwords do not match',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.password = '';
        this.confirmPassword = '';
      });
      return;
    }
    const user: Users = {
      username: this.username,
      email: this.email,
      password: this.password,
      _id: '',
      createdAt: '',
    };
    this.authService.addUser(user).subscribe(
      (res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User registered successfully!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // this.location.go('/login');
          this.route.navigate(['/login']);
        });
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Username or Email already registered',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.username = '';
          this.email = '';
        });
      }
    );
  }

  validateAll(): void {
    this.validate =
      this.username !== '' &&
      this.email !== '' &&
      this.password !== '' &&
      this.confirmPassword !== '' &&
      this.isValidEmail(this.email);
    this.validatePassword();
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    return emailPattern.test(email);
  }

  validatePassword(): void {
    this.passwordMatch = this.password === this.confirmPassword;
  }

  routeBack(): void {
    console.log('routeBack');
    this.location.back();
  }
}
