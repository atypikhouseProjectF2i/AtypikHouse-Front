import { Injectable } from '@angular/core';
import { Accommodation } from '../models/accommodation.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccommodationListService {
  private accommodationUrl = 'http://localhost:8000/api/accommodations';
  listAccommodation!: Accommodation[];

  constructor(private http: HttpClient) {}

  getAllAccommodations(page?: number): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(
      `${this.accommodationUrl}?page=${page}`
    );
  }
}
