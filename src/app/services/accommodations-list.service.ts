import { Injectable } from '@angular/core';
import { Accommodation } from '../models/accommodation.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccommodationListService {
  private accommodationUrl = 'http://localhost:8000/api';
  list!: Accommodation[];

  constructor(private http: HttpClient) {}

  getAllAccommodations(): Observable<any> {
    return this.http.get('http://localhost:8000/api/accommodations');
  }
}
