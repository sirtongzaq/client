import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatIconModule, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  isLogin: boolean = true;
  constructor(public router: Router) {}

  ngOnInit(): void {
    if (this.isLogin === false) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  routeHome() {
    this.router.navigate(['/home']);
  }
}
