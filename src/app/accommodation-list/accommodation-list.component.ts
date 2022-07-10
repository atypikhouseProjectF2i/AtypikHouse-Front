import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Accommodation } from '../models/accommodation.model';
import { AccommodationListService } from '../services/accommodations-list.service';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.scss'],
})
export class AccommodationListComponent implements OnInit {
  accommodation$!: Observable<Accommodation[]>;
  length!: number;
  displayFilter!: boolean;

  constructor(public accommodationService: AccommodationListService) {}

  ngOnInit(): void {
    //display the accommodations on init of component
    this.accommodation$ = this.getData().pipe(
      map((value: any) => value['hydra:member'])
    );

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
}
