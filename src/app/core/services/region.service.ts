import { HttpClient, HttpParamsOptions } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Region } from '../models/region.model';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private baseUrl = 'http://localhost:8000/api/regions';

  constructor(private http: HttpClient) {}

  region!: Region;

  getAllRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.baseUrl}`);
  }
}
