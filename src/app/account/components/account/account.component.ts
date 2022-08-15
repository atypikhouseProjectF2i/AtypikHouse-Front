import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Booking } from 'src/app/core/models/booking.model';
import { User } from 'src/app/core/models/user.model';
import { AccommodationService } from 'src/app/core/services/accommodation.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BookingService } from 'src/app/core/services/booking.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  token!: any;
  userData$!: Observable<User>;
  bookingUser$!: Observable<Booking[]>;
  regexPhone: string = '^((\\+)33|0)[1-9](\\d{2}){4}$';
  userPutForm!: FormGroup;
  idUser!: number;
  loading$ = this.loader.loading$;
  putSuccess: boolean = false;
  putSuccessPassword: boolean = false;
  pathImage!: string;

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private accommodationService: AccommodationService,
    private loader: LoadingService,
    private ref: ChangeDetectorRef,
    private formBuiler: FormBuilder
  ) {}

  ngOnInit(): void {
    this.pathImage = this.accommodationService.pathImage;
    this.token = this.authService.getToken();
    if (this.token) {
      this.userData$ = this.authService.getUser().pipe(
        tap((response) => {
          this.idUser = response.id;
          this.userPutForm.patchValue(response);
        }),
        switchMap(
          () =>
            (this.bookingUser$ = this.bookingService
              .getBookingByIdUser(this.idUser)
              .pipe(map((res: any) => res['hydra:member'])))
        )
      );
    }

    this.userPutForm = this.formBuiler.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      firstname: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(this.regexPhone)]],
      oldPassword: [null],
      newPassword: [null],
      newsletter: [false],
    });
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  onSubmit() {
    if (
      this.userPutForm.value.oldPassword &&
      this.userPutForm.value.newPassword !== null
    ) {
      this.authService
        .updatePassword(
          this.idUser,
          this.userPutForm.value.oldPassword,
          this.userPutForm.value.newPassword
        )
        .subscribe({
          next: () => {},
          error: (error: any) => {
            if (error.status === 403) {
              this.putSuccessPassword = true;
              this.putSuccess = false;
            }
          },
        });
    }

    if (this.userPutForm.valid) {
      this.authService
        .updateUser(this.idUser, this.userPutForm.value)
        .subscribe({
          next: () => {
            this.putSuccess = true;
          },
          error: () => {},
        });
    }
  }
}
