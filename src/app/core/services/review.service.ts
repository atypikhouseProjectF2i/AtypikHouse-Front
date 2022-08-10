import { HttpClient, HttpParamsOptions } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private baseUrl = 'https://dsp-devo20-ecs-yl-am-ee.fr/api/public/api';

  constructor(private http: HttpClient) {}

  review!: Review;

  getAllReviewsByAccommodationId(
    idAccommodation: number
  ): Observable<Review[]> {
    return this.http.get<Review[]>(
      `${this.baseUrl}/reviews?accommodation.id=${idAccommodation}`
    );
  }

  newReview(
    comment: string,
    score: number,
    accommodation: string,
    user: string
  ) {
    return this.http.post(`${this.baseUrl}/reviews`, {
      comment,
      score,
      accommodation,
      user,
    });
  }
}
