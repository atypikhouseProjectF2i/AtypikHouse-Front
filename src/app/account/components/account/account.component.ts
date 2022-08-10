import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  token!: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();
  }
}
