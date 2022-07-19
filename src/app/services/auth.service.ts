import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  signIn(username: string, password: string) {
    return this.http.post(`${this.baseUrl}login`, { username, password }).pipe(
      map((response: any) => {
        localStorage.setItem('token', JSON.stringify(response.token));
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
