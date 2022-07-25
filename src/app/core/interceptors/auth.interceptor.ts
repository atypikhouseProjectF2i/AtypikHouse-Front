import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = JSON.parse(this.auth.getToken() || '[]');

    if (token.length !== 0) {
      const headers = new HttpHeaders().append(
        'Authorization',
        `Bearer ${token}`
      );

      req = req.clone({ headers });
    }
    return next.handle(req);
  }
}
