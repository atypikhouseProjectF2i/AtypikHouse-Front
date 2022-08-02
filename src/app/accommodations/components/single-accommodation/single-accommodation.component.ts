import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Accommodation } from 'src/app/core/models/accommodation.model';
import { AccommodationService } from 'src/app/core/services/accommodation.service';

@Component({
  selector: 'app-single-accommodation',
  templateUrl: './single-accommodation.component.html',
  styleUrls: ['./single-accommodation.component.scss'],
})
export class SingleAccommodationComponent implements OnInit {
  accommodation$!: Observable<Accommodation>;
  pathImage!: string;

  constructor(
    private activedRoute: ActivatedRoute,
    private accommodationService: AccommodationService
  ) {}

  ngOnInit(): void {
    const idAccommodation = +this.activedRoute.snapshot.params['id'];
    this.pathImage = this.accommodationService.pathImage;
    this.accommodation$ =
      this.accommodationService.getAccommodationById(idAccommodation);
  }
}
