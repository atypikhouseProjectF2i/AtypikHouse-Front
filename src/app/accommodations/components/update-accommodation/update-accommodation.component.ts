import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, tap, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from 'src/app/core/services/accommodation.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ActivityService } from 'src/app/core/services/activity.service';
import { Activity } from 'src/app/core/models/activity.model';
import { ServiceAccommodation } from 'src/app/core/models/service-accommodation.model';
import { ServiceAccommodationService } from 'src/app/core/services/service-accommodation.service';

@Component({
  selector: 'app-update-accommodation',
  templateUrl: './update-accommodation.component.html',
  styleUrls: ['./update-accommodation.component.scss'],
})
export class UpdateAccommodationComponent implements OnInit {
  updateAccommodationForm!: FormGroup;
  idAccommodation!: number;
  isHost: boolean = false;
  pathImage!: string;
  updateAccommodation$!: Observable<any>;
  activity$!: Observable<Activity[]>;
  activityCheck!: any;
  serviceAcco$!: Observable<ServiceAccommodation[]>;
  serviceAccoCheck!: any;
  loading$ = this.loader.loading$;

  constructor(
    private accommodationService: AccommodationService,
    private activityService: ActivityService,
    private serviceAccommodationService: ServiceAccommodationService,
    private activedRoute: ActivatedRoute,
    private loader: LoadingService,
    private ref: ChangeDetectorRef,
    private formBuiler: FormBuilder
  ) {}

  ngOnInit(): void {
    this.idAccommodation = +this.activedRoute.snapshot.params['id'];
    this.updateAccommodation$ = this.accommodationService
      .getAccommodationById(this.idAccommodation)
      .pipe(
        tap((response) => {
          this.updateAccommodationForm.patchValue(response);

          //enabled check for activity
          this.activityCheck = (idActivity: number): any => {
            for (let i = 0; i < response.activity?.length!; i++) {
              if (response.activity![i].id === idActivity) {
                return true;
              }
            }
          };

          const checkArrayActivity: FormArray = this.updateAccommodationForm
            .controls['activity'] as FormArray;
          response.activity?.forEach((data: any) => {
            checkArrayActivity.push(
              new FormControl('api/activities/' + data.id)
            );
          });

          //enabled check for service
          this.serviceAccoCheck = (idService: number): any => {
            for (let i = 0; i < response.serviceAcco?.length!; i++) {
              if (response.serviceAcco![i].id === idService) {
                return true;
              }
            }
          };

          const checkArrayService: FormArray = this.updateAccommodationForm
            .controls['serviceAcco'] as FormArray;
          response.serviceAcco?.forEach((data: any) => {
            checkArrayService.push(
              new FormControl('api/servic_accos/' + data.id)
            );
          });
        })
      );

    this.activity$ = this.activityService
      .getAllActivities()
      .pipe(map((res: any) => res['hydra:member']));

    this.serviceAcco$ = this.serviceAccommodationService
      .getAllServices()
      .pipe(map((res: any) => res['hydra:member']));

    this.pathImage = this.accommodationService.pathImage;

    this.updateAccommodationForm = this.formBuiler.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      surface: [null, [Validators.required]],
      description: [null, [Validators.required]],
      address: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      city: [null, [Validators.required]],
      region: [null, [Validators.required]],
      typeAccommodation: [null, [Validators.required]],
      nbSleeping: [null, [Validators.required]],
      capacityAdult: [null, [Validators.required]],
      capacityChild: [null, [Validators.required]],
      activity: new FormArray([]),
      serviceAcco: new FormArray([]),
    });
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  onSubmit() {
    console.log(this.updateAccommodationForm.value.activity);
  }

  onCheckboxChangeActivity(event: any) {
    const checkArrayActivity: FormArray = this.updateAccommodationForm.controls[
      'activity'
    ] as FormArray;
    if (event.target.checked) {
      checkArrayActivity.push(
        new FormControl('api/activities/' + event.target.value)
      );
    } else {
      const index = checkArrayActivity.controls.findIndex(
        (x) => x.value === event.target.value
      );
      checkArrayActivity.removeAt(index);
    }
  }

  onCheckboxChangeService(event: any) {
    const checkArrayService: FormArray = this.updateAccommodationForm.controls[
      'serviceAcco'
    ] as FormArray;
    if (event.target.checked) {
      checkArrayService.push(
        new FormControl('api/service_accos/' + event.target.value)
      );
    } else {
      const index = checkArrayService.controls.findIndex(
        (x) => x.value === event.target.value
      );
      checkArrayService.removeAt(index);
    }
  }
}
