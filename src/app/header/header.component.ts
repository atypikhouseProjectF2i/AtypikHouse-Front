import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  token!: string | null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();
  }

  logout(): void {
    const token = this.authService.getToken();
    if (token) {
      localStorage.removeItem('token');
      window.location.reload();
    }
  }
}
