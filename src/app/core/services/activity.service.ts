import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private baseUrl = 'https://dsp-devo20-ecs-yl-am-ee.fr/api/public/api';

  constructor(private http: HttpClient) {}

  getAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.baseUrl}/activities`);
  }

  updateActivityById(id: number, name: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/activities/${id}`, { name });
  }

  addNewActivity(formValueEquipement: { name: string }) {
    return this.http.post(`${this.baseUrl}/activities`, formValueEquipement);
  }

  deleteActivityById(idActivity: number) {
    return this.http.delete(`${this.baseUrl}/activities/${idActivity}`);
  }
}
