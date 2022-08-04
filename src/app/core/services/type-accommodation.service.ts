import { HttpClient, HttpParamsOptions } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { TypeAccommodation } from '../models/type-accommodation.model';

@Injectable({
  providedIn: 'root',
})
export class TypeAccommodationService {
  private baseUrl = 'https://dsp-devo20-ecs-yl-am-ee.fr/api/public/api';

  constructor(private http: HttpClient) {}

  typeAccommodation!: TypeAccommodation;

  getAllTypes(): Observable<TypeAccommodation[]> {
    return this.http.get<TypeAccommodation[]>(
      `${this.baseUrl}/type_accommodations`
    );
  }
}
