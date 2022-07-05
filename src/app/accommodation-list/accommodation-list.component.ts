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
  constructor(public accommodationService: AccommodationListService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.accommodationService.getAllAccommodations().subscribe((response) => {
      this.accommodationService.list = response['hydra:member'];
    });
  }
}
