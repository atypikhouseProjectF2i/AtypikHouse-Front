import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  constructor(
    private activedRoute: ActivatedRoute,
    private bookingService: BookingService
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
            this.dateDisabled = (date: Date | null): boolean => {
              this.dateBooking.forEach((item) => {
                item;
                item.forEach((res) => {
                  return !(date! >= res && date! <= res);
                });
              });
              return (
                !date! &&
                !(
                  date! >= this.dateBooking[1][0] &&
                  date! <= this.dateBooking[1][1]
                ) &&
                date! >= new Date()
              );
            };
          });
        },
      });
  }
}
