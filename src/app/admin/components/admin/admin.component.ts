import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ServiceAccommodation } from 'src/app/core/models/service-accommodation.model';
import { ServicesAccommodationService } from 'src/app/core/services/services-accommodations.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  servicesAccommodations$!: Observable<ServiceAccommodation[]>;

  constructor(
    private servicesAccommodationsService: ServicesAccommodationService
  ) {}

  ngOnInit(): void {
    this.servicesAccommodations$ = this.servicesAccommodationsService
      .getAllServices()
      .pipe(map((res: any) => res['hydra:member']));
  }

  editService(idService: number) {
    alert(idService);
  }
}
