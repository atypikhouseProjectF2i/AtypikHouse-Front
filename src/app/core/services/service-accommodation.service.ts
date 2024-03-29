import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceAccommodation } from '../models/service-accommodation.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceAccommodationService {
  private baseUrl = 'https://dsp-devo20-ecs-yl-am-ee.fr/api/public/api';

  constructor(private http: HttpClient) {}

  getAllServices(): Observable<ServiceAccommodation[]> {
    return this.http.get<ServiceAccommodation[]>(
      `${this.baseUrl}/service_accos`
    );
  }

  updateServiceById(id: number, name: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/service_accos/${id}`, { name });
  }

  addNewService(formValueService: { name: string }) {
    return this.http.post(`${this.baseUrl}/service_accos`, formValueService);
  }

  deleteServiceById(idService: number) {
    return this.http.delete(`${this.baseUrl}/service_accos/${idService}`);
  }
}
