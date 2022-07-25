import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  token!: string | null;
  roles!: any[];
  admin: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.roles = JSON.parse(sessionStorage.getItem('roles') || '[]');
    this.roles.includes('ROLE_ADMIN')
      ? (this.admin = true)
      : (this.admin = false);
  }

  logout(): void {
    const token = this.authService.getToken();
    if (token) {
      sessionStorage.clear();
      window.location.reload();
    }
  }
}
