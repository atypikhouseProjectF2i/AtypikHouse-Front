import { HttpClient, HttpParamsOptions } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8000/api/login';

  constructor(private http: HttpClient) {}

  user!: User;

  connectUser(info: Object): Observable<Object> {
    return this.http.post<User>(`${this.baseUrl}`, info);
  }
}
