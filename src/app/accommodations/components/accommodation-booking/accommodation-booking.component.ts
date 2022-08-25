import { Component, Input, OnInit } from '@angular/core';
import { Accommodation } from 'src/app/core/models/accommodation.model';
import { AccommodationService } from 'src/app/core/services/accommodation.service';

@Component({
  selector: 'app-accommodation-booking',
  templateUrl: './accommodation-booking.component.html',
  styleUrls: ['./accommodation-booking.component.scss'],
})
export class AccommodationBookingComponent implements OnInit {
  @Input() accommodationHost!: Accommodation;
  pathImage!: string;

  constructor(private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.pathImage = this.accommodationService.pathImage;
  }
}
