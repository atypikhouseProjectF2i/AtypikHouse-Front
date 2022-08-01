import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  signIn(username: string, password: string) {
    return this.http.post(`${this.baseUrl}/login`, { username, password }).pipe(
      map((response: any) => {
        sessionStorage.setItem('token', JSON.stringify(response.token));
      })
    );
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getRoles() {
    return this.http.get(`${this.baseUrl}/me`).pipe(
      map((response: any) => {
        sessionStorage.setItem('roles', JSON.stringify(response.roles));
      })
    );
  }

  signUp(formValueUser: {
    name: string;
    firstname: string;
    email: string;
    password: string;
    phone: string;
    newsletter: string;
  }) {
    return this.http.post(`${this.baseUrl}/users`, formValueUser);
  }
}
