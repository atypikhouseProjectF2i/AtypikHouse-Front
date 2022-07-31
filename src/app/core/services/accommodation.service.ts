import { Injectable } from '@angular/core';
import { Accommodation } from '../models/accommodation.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  private accommodationUrl = 'http://localhost:8000/api';
  pathImage = 'http://localhost:8000/';
  listAccommodation!: Accommodation[];

  constructor(private http: HttpClient) {}

  getAllAccommodations(page?: number): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(
      `${this.accommodationUrl}/accommodations/?page=${page}`
    );
  }
}
