import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-loginlayout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './loginlayout.component.html',
  styleUrl: './loginlayout.component.scss',
})
export class LoginlayoutComponent {}
