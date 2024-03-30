import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { CreateComponent } from '../create/create.component';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatIconModule, RouterOutlet, CreateComponent, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
})
export class LayoutComponent implements OnInit {
  isLogin: boolean = false;
  isOpenCreate: boolean = false;
  user: any = null;
  innerWidth: number = window.innerWidth;
  mobileMode: boolean = false;
  constructor(
    public router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  @HostListener('window:resize')
  onResize() {
    this.innerWidth = window.innerWidth;
    this.mobileMode = this.innerWidth < 768;
    this.userService.setMobileMode(this.mobileMode);
  }

  ngOnInit(): void {
    this.getUserByToken();
    this.innerWidth = window.innerWidth;
    this.mobileMode = this.innerWidth < 768;
    this.userService.setMobileMode(this.mobileMode);
  }

  toggleCreateTodo(): void {
    this.isOpenCreate = !this.isOpenCreate;
  }

  getUserByToken() {
    this.authService.getUserByToken().subscribe({
      next: (res) => {
        if (res) {
          this.user = res;
          this.userService.setUserData(res.user);
          this.isLogin = true;
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
  routeProfile() {
    this.router.navigate(['/profile']);
  }
  routeContact() {
    this.router.navigate(['/contact']);
  }
}
