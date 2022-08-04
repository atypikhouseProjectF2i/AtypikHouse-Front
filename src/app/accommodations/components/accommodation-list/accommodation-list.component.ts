import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { Accommodation } from '../../../core/models/accommodation.model';
import { Region } from '../../../core/models/region.model';
import { TypeAccommodation } from '../../../core/models/type-accommodation.model';
import { AccommodationService } from '../../../core/services/accommodation.service';
import { RegionService } from '../../../core/services/region.service';
import { TypeAccommodationService } from '../../../core/services/type-accommodation.service';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.scss'],
  animations: [
    trigger('filterOpen', [
      state(
        'open',
        style({
          visibility: 'visible',
        })
      ),
      state(
        'closed',
        style({
          height: '0',
          visibility: 'hidden',
        })
      ),
      transition('open => closed', [animate('.5s')]),
      transition('closed => open', [animate('.5s')]),
    ]),

    trigger('capacityOpen', [
      state(
        'open',
        style({
          height: '100px',
          visibility: 'visible',
        })
      ),
      state(
        'closed',
        style({
          height: '0',
          visibility: 'hidden',
        })
      ),
    ]),
  ],
})
export class AccommodationListComponent implements OnInit {
  accommodation$!: Observable<Accommodation[]>;
  region$!: Observable<Region[]>;
  typeAccommodation$!: Observable<TypeAccommodation[]>;
  length!: number;
  isOpen: boolean = false;
  isOpenCapacity: boolean = false;
  capacityFilter!: boolean;
  counterAdult: number = 0;
  counterChild: number = 0;
  loading$ = this.loader.loading$;

  constructor(
    public accommodationService: AccommodationService,
    public regionService: RegionService,
    public typeAccommodationService: TypeAccommodationService,
    private loader: LoadingService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    //display the accommodations on init of component
    this.accommodation$ = this.getData().pipe(
      tap((response: any) => (this.length = response['hydra:totalItems'])),
      map((value: any) => value['hydra:member'])
    );

    //get the data for filter
    this.region$ = this.getRegions();
    this.typeAccommodation$ = this.getTypes();
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  //function event on change page
  onPageChange(event: any): void {
    this.accommodation$ = this.getData(event.pageIndex + 1).pipe(
      map((value: any) => value['hydra:member'])
    );
  }

  //function who recup the accommodation in the service
  getData(page: number = 1): Observable<Accommodation[]> {
    return this.accommodationService.getAllAccommodations(page);
  }

  getRegions(): Observable<Region[]> {
    return this.regionService
      .getAllRegions()
      .pipe(map((value: any) => value['hydra:member']));
  }

  getTypes(): Observable<TypeAccommodation[]> {
    return this.typeAccommodationService
      .getAllTypes()
      .pipe(map((value: any) => value['hydra:member']));
  }

  //funtions on DOM event

  displayMenu() {
    this.isOpen = !this.isOpen;
  }

  displayCapacity() {
    this.isOpenCapacity = !this.isOpenCapacity;
  }

  onClickCapacity(): void {
    if (this.capacityFilter === true) {
      this.capacityFilter = false;
    } else {
      this.capacityFilter = true;
    }
  }

  buttonCapacityChild(option: string, adultOrChild: string): void {
    if (option === 'add' && adultOrChild === 'adult') {
      this.counterAdult !== 10 ? this.counterAdult++ : this.counterAdult;
    } else {
      if (this.counterAdult !== 0 && adultOrChild === 'adult') {
        this.counterAdult--;
      }
    }

    if (option === 'add' && adultOrChild === 'child') {
      this.counterChild !== 10 ? this.counterChild++ : this.counterChild;
    } else {
      if (this.counterChild !== 0 && adultOrChild === 'child') {
        this.counterChild--;
      }
    }
  }
}
