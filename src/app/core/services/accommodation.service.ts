import { Injectable } from '@angular/core';
import { Accommodation } from '../models/accommodation.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  private baseUrl = 'https://dsp-devo20-ecs-yl-am-ee.fr/api/public/api';
  pathImage = 'https://dsp-devo20-ecs-yl-am-ee.fr/api/public/';
  listAccommodation!: Accommodation[];

  constructor(private http: HttpClient) {}

  getAllAccommodations(page?: number): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(
      `${this.baseUrl}/accommodations/?page=${page}`
    );
  }

  getAccommodationById(id: number): Observable<Accommodation> {
    return this.http.get<Accommodation>(`${this.baseUrl}/accommodations/${id}`);
  }

  getAccommodationByIdUser(id: number): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(
      `${this.baseUrl}/accommodations?user=${id}&pagination=false`
    );
  }
}
