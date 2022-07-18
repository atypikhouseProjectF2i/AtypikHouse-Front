import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Accommodation } from '../models/accommodation.model';
import { Region } from '../models/region.model';
import { TypeAccommodation } from '../models/type-accommodation.model';
import { AccommodationService } from '../services/accommodations.service';
import { RegionService } from '../services/region.service';
import { TypeAccommodationService } from '../services/type-accommodation.service';

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
  capacityFilter!: boolean;
  counterAdult: number = 0;
  counterChild: number = 0;

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

  //funtions on DOM event

  onClickFilter(): void {
    if (this.displayFilter === true) {
      this.displayFilter = false;
    } else {
      this.displayFilter = true;
    }
  }

  onClickCapacity(): void {
    if (this.capacityFilter === true) {
      this.capacityFilter = false;
    } else {
      this.capacityFilter = true;
    }
  }

  buttonCapacityChild(option: string, adultOrChild: string): void {
    if (option === 'add' && adultOrChild === 'adult') {
      this.counterAdult !== 10 ? this.counterAdult++ : this.counterAdult;
    } else {
      if (this.counterAdult !== 0 && adultOrChild === 'adult') {
        this.counterAdult--;
      }
    }

    if (option === 'add' && adultOrChild === 'child') {
      this.counterChild !== 10 ? this.counterChild++ : this.counterChild;
    } else {
      if (this.counterChild !== 0 && adultOrChild === 'child') {
        this.counterChild--;
      }
    }
  }
}
