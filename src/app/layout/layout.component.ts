import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatIconModule, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  isLogin: boolean = false;
  user: any = null;
  constructor(
    public router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserByToken();
  }

  getUserByToken() {
    this.authService.getUserByToken().subscribe({
      next: (res) => {
        if (res) {
          console.log(res);
          this.user = res;
          this.userService.setUserData(res.user);
          this.isLogin = true;
          console.log('user', this.user);
        } else {
          console.log('No user found');
        }
        this.navigateBasedOnLoginStatus();
      },
      error: (error) => {
        console.log(error);
        this.isLogin = false;
        this.user = null;
        this.navigateBasedOnLoginStatus();
      },
    });
  }

  navigateBasedOnLoginStatus() {
    if (this.isLogin) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
    this.isLogin = false;
    this.user = null;
    this.navigateBasedOnLoginStatus();
  }

  routeHome() {
    this.router.navigate(['/home']);
  }
}
