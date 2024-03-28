import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../user.service';
import { Users } from '../users.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private route: Router) {}
  username: string = '';
  password: string = '';
  validate: boolean = false;
  ngOnInit(): void {}
  login(): void {
    console.log('login');
  }
  validateAll(): void {
    this.validate = this.username !== '' && this.password !== '';
  }
  routeRegister(): void {
    this.route.navigate(['/register']);
  }
}
