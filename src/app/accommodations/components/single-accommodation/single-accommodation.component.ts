import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, pipe, tap } from 'rxjs';
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
  totalReview: number = 0;
  reviewForm!: FormGroup;
  isConnect: boolean = false;

  constructor(
    private activedRoute: ActivatedRoute,
    private accommodationService: AccommodationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const idAccommodation = +this.activedRoute.snapshot.params['id'];
    this.pathImage = this.accommodationService.pathImage;
    this.accommodation$ = this.accommodationService
      .getAccommodationById(idAccommodation)
      .pipe(
        tap((value: any) => {
          this.calculScore(value['reviews']);
        })
      );

    this.reviewForm = this.formBuilder.group(
      {
        score: [null, [Validators.required]],
        comment: [null, [Validators.required]],
      },
      {
        updateOn: 'blur',
      }
    );
  }

  calculScore(review: any): any {
    let total = 0;
    review.forEach((element: any) => {
      total += element.score / review.length;
      this.totalReview = Math.round(total);
    });
  }

  submitReview() {
    if (sessionStorage.getItem('roles') !== null) {
      console.log(this.reviewForm.value);
    } else {
      alert('vous devez être connecté pour poster en commentaire !');
    }
  }

  isLogged(): boolean {
    if (sessionStorage.getItem('roles') === null) {
      this.isConnect = false;
    } else {
      this.isConnect = true;
    }
    return this.isConnect;
  }
}
