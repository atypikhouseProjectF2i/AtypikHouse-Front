import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Accommodation } from '../../../core/models/accommodation.model';
import { AccommodationService } from '../../../core/services/accommodation.service';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.scss'],
})
export class AccommodationComponent implements OnInit {
  @Input() accommodation!: Accommodation;
  pathImage!: string;
  constructor(
    private router: Router,
    private accommodationService: AccommodationService
  ) {}

  ngOnInit(): void {
    this.pathImage =
      this.accommodationService.pathImage + this.accommodation.imageUrl;
  }

  onClickAccommodation() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`hebergements/${this.accommodation.id}`])
    );

    window.open(url, '_blank');
  }
}
