import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { Users } from '../users.interface';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}
  username: string = '';
  password: string = '';
  validate: boolean = false;
  ngOnInit(): void {}

  login(): void {
    if (!this.validate) {
      // Validation failed
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter your username and password',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      (res) => {
        const token = res.body.token;
        localStorage.setItem('x-token-acesss', token);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Login Successful',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.route.navigate(['/home']);
        });
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Username or password incorrect',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.username = '';
          this.password = '';
        });
      }
    );
  }

  validateAll(): void {
    this.validate = this.username !== '' && this.password !== '';
  }
  routeRegister(): void {
    this.route.navigate(['/register']);
  }
}
