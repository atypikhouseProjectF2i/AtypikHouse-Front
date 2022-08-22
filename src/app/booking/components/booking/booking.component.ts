import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Booking } from 'src/app/core/models/booking.model';
import { BookingService } from 'src/app/core/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  idAccommodation!: number;
  bookingAccommodation$!: Observable<Booking[]>;
  dateBooking: Array<Array<any>> = [];
  dateDisabled!: any;
  bookingForm!: FormGroup;

  constructor(
    private activedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.idAccommodation = +this.activedRoute.snapshot.params['id'];
    this.bookingService
      .getBookingByIdAccommodation(this.idAccommodation)
      .pipe(map((res: any) => res['hydra:member']))
      .subscribe({
        next: (res: any) => {
          res.forEach((element: any) => {
            this.dateBooking.push([
              new Date(element.startDate),
              new Date(element.endDate),
            ]);
          });

          this.dateDisabled = (date: Date | null): any => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (date! < today) return false;
            for (let i = 0; i < this.dateBooking.length; i++) {
              if (
                date! >= this.dateBooking[i][0] &&
                date! <= this.dateBooking[i][1]
              )
                return false;
            }
            return true;
          };
        },
      });

    this.bookingForm = this.formBuilder.group(
      {
        start: [null, [Validators.required]],
        end: [null, Validators.required],
      },
      {
        updateOn: 'blur',
      }
    );
  }
  onSubmit() {
    console.log(this.bookingForm.value);
  }
}
