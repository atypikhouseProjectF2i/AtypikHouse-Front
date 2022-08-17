import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceAccommodation } from '../models/service-accommodation.model';

@Injectable({
  providedIn: 'root',
})
export class ServicesAccommodationService {
  private baseUrl = 'https://dsp-devo20-ecs-yl-am-ee.fr/api/public/api';

  constructor(private http: HttpClient) {}

  getAllServices(): Observable<ServiceAccommodation[]> {
    return this.http.get<ServiceAccommodation[]>(`${this.baseUrl}/services`);
  }
}
