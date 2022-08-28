import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { About } from '../models/about-model';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private baseUrl = 'https://dsp-devo20-ecs-yl-am-ee.fr/api/public/api';

  constructor(private http: HttpClient) {}

  getAboutText(): Observable<About> {
    return this.http.get<About>(`${this.baseUrl}/abouts/1`);
  }

  putAboutText(formValue: {
    title: string;
    description: string;
  }): Observable<About> {
    return this.http.put<About>(`${this.baseUrl}/abouts/1`, formValue);
  }
}
