import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Accommodation } from '../models/accommodation.model';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.scss'],
})
export class AccommodationComponent implements OnInit {
  @Input() accommodation!: Accommodation;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClickAccommodation() {
    this.router.navigateByUrl(`hebergements/${this.accommodation.id}`);
  }
}
