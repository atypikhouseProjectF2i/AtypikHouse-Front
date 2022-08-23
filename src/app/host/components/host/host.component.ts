import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, Observable, ObservedValueOf, switchMap } from 'rxjs';
import { AccommodationService } from 'src/app/core/services/accommodation.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss'],
})
export class HostComponent implements OnInit {
  isConnect: boolean = false;
  accommodationByUser$!: Observable<any>;
  loading$ = this.loader.loading$;

  constructor(
    private authService: AuthService,
    private accommodationService: AccommodationService,
    private loader: LoadingService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('token') !== null) {
      this.accommodationByUser$ = this.authService.getUser().pipe(
        switchMap((user: any) =>
          this.accommodationService.getAccommodationByIdUser(user?.id)
        ),
        map((res: any) => res['hydra:member'])
      );
    }
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  isLogged(): boolean {
    if (sessionStorage.getItem('token') === null) {
      this.isConnect = false;
    } else {
      this.isConnect = true;
    }
    return this.isConnect;
  }
}
