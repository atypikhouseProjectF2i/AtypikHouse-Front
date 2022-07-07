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
  constructor(public accommodationService: AccommodationListService) {}

  ngOnInit(): void {
    this.accommodation$ = this.getData().pipe(
      map((value: any) => value['hydra:member'])
    );

    this.getData().subscribe((response: any) => {
      this.length = response['hydra:totalItems'];
    });
  }

  onPageChange(event: any): void {
    this.accommodation$ = this.getData(event.pageIndex + 1).pipe(
      map((value: any) => value['hydra:member'])
    );
  }

  getData(page: number = 1): Observable<Accommodation[]> {
    return this.accommodationService.getAllAccommodations(page);
  }
}
