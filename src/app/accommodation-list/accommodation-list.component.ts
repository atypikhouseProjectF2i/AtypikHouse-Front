import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Accommodation } from '../models/accommodation.model';
import { Region } from '../models/region.model';
import { TypeAccommodation } from '../models/type-accommodation.model';
import { AccommodationService } from '../services/accommodations.service';
import { RegionService } from '../services/region.service';
import { TypeAccommodationService } from '../services/type_accommodation.service';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.scss'],
})
export class AccommodationListComponent implements OnInit {
  accommodation$!: Observable<Accommodation[]>;
  region$!: Observable<Region[]>;
  typeAccommodation$!: Observable<TypeAccommodation[]>;
  length!: number;
  displayFilter!: boolean;

  constructor(
    public accommodationService: AccommodationService,
    public regionService: RegionService,
    public typeAccommodationService: TypeAccommodationService
  ) {}

  ngOnInit(): void {
    //display the accommodations on init of component
    this.accommodation$ = this.getData().pipe(
      map((value: any) => value['hydra:member'])
    );

    //get the data for filter
    this.region$ = this.getRegions();
    this.typeAccommodation$ = this.getTypes();

    //collect the total items for paginator
    this.getData().subscribe((response: any) => {
      this.length = response['hydra:totalItems'];
    });
  }

  //function event on change page
  onPageChange(event: any): void {
    this.accommodation$ = this.getData(event.pageIndex + 1).pipe(
      map((value: any) => value['hydra:member'])
    );
  }

  //function who recup the accommodation in the service
  getData(page: number = 1): Observable<Accommodation[]> {
    return this.accommodationService.getAllAccommodations(page);
  }

  //function on control display the filter
  onClickFilter(): void {
    if (this.displayFilter === true) {
      this.displayFilter = false;
    } else {
      this.displayFilter = true;
    }
  }

  getRegions(): Observable<Region[]> {
    return this.regionService
      .getAllRegions()
      .pipe(map((value: any) => value['hydra:member']));
  }

  getTypes(): Observable<TypeAccommodation[]> {
    return this.typeAccommodationService
      .getAllTypes()
      .pipe(map((value: any) => value['hydra:member']));
  }
}
