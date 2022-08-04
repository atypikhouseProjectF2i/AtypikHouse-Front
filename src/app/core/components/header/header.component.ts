import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('menuOpen', [
      state(
        'open',
        style({
          height: '170px',
          visibility: 'visible',
        })
      ),
      state(
        'closed',
        style({
          height: '0',
          visibility: 'hidden',
          backgroundColor: 'white',
        })
      ),
      transition('open => closed', [animate('.3s')]),
      transition('closed => open', [animate('.5s')]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  token!: string | null;
  roles!: any[];
  admin: boolean = false;
  isOpen: boolean = false;

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

  displayMenu() {
    this.isOpen = !this.isOpen;
  }
}
