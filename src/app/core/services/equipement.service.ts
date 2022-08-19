import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipement } from '../models/equipement.model';

@Injectable({
  providedIn: 'root',
})
export class EquipementService {
  private baseUrl = 'https://dsp-devo20-ecs-yl-am-ee.fr/api/public/api';

  constructor(private http: HttpClient) {}

  getAllEquipements(): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(`${this.baseUrl}/equipements`);
  }

  updateEquipementById(id: number, name: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/equipements/${id}`, { name });
  }

  addNewEquipement(formValueEquipement: { name: string }) {
    return this.http.post(`${this.baseUrl}/equipements`, formValueEquipement);
  }

  deleteEquipementById(idEquipement: number) {
    return this.http.delete(`${this.baseUrl}/equipements/${idEquipement}`);
  }
}
