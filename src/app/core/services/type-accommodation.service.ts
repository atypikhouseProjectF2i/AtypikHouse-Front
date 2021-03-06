import { HttpClient, HttpParamsOptions } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { TypeAccommodation } from '../models/type-accommodation.model';

@Injectable({
  providedIn: 'root',
})
export class TypeAccommodationService {
  private baseUrl = 'http://localhost:8000/api/type_accommodations';

  constructor(private http: HttpClient) {}

  typeAccommodation!: TypeAccommodation;

  getAllTypes(): Observable<TypeAccommodation[]> {
    return this.http.get<TypeAccommodation[]>(`${this.baseUrl}`);
  }
}
