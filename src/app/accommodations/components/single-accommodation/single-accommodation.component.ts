import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { Accommodation } from 'src/app/core/models/accommodation.model';
import { Review } from 'src/app/core/models/review.model';
import { AccommodationService } from 'src/app/core/services/accommodation.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ReviewService } from 'src/app/core/services/review.service';
import { LoadingService } from 'src/app/core/services/loading.service';

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
  reviewList!: Review[];
  responsiveOptions!: any;
  isEmpty!: boolean;
  idAccommodation!: number;
  errorReview!: boolean;
  successReview!: boolean;

  loading$ = this.loader.loading$;

  constructor(
    private activedRoute: ActivatedRoute,
    private accommodationService: AccommodationService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private loader: LoadingService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    this.idAccommodation = +this.activedRoute.snapshot.params['id'];
    this.pathImage = this.accommodationService.pathImage;
    this.accommodation$ = this.accommodationService
      .getAccommodationById(this.idAccommodation)
      .pipe(
        tap((value: any) => {
          this.reviewList = value['reviews'];
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
    review.length === 0 ? (this.isEmpty = false) : (this.isEmpty = true);
    let total = 0;
    review.forEach((element: any) => {
      total += element.score / review.length;
      this.totalReview = Math.round(total);
    });
  }

  isLogged(): boolean {
    if (sessionStorage.getItem('token') === null) {
      this.isConnect = false;
    } else {
      this.isConnect = true;
    }
    return this.isConnect;
  }

  submitReview() {
    if (sessionStorage.getItem('token') !== null) {
      this.authService
        .getUser()
        .pipe(
          switchMap((user: any) =>
            this.reviewService.newReview(
              this.reviewForm.value.comment,
              this.reviewForm.value.score,
              `api/accommodations/${this.idAccommodation}`,
              `api/users/${user.id}`
            )
          )
        )
        .subscribe({
          next: () => {
            this.successReview = true;
          },
          error: () => {
            this.errorReview = true;
          },
        });
    }
  }
}
