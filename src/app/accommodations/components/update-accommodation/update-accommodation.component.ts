import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-update-accommodation',
  templateUrl: './update-accommodation.component.html',
  styleUrls: ['./update-accommodation.component.scss'],
})
export class UpdateAccommodationComponent implements OnInit {
  updateAccommodationForm!: FormGroup;
  idAccommodation!: number;
  pathImage!: string;
  updateAccommodation$!: Observable<any>;
  activity$!: Observable<any>;

  constructor(
    private accommodationService: AccommodationService,
    private activityService: ActivityService,
    private activedRoute: ActivatedRoute,
    private loader: LoadingService,
    private formBuiler: FormBuilder
  ) {}

  ngOnInit(): void {
    this.idAccommodation = +this.activedRoute.snapshot.params['id'];
    this.updateAccommodation$ = this.accommodationService
      .getAccommodationById(this.idAccommodation)
      .pipe(
        tap((response) => {
          this.updateAccommodationForm.patchValue(response);
        })
      );
    this.activity$ = this.activityService
      .getAllActivities()
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
      activity: this.formBuiler.array([]),
    });
  }

  onSubmit() {
    console.log(this.updateAccommodationForm.value);
  }

  onCheckboxChangeActivity(event: any) {
    const checkArray: FormArray = this.updateAccommodationForm.get(
      'activity'
    ) as FormArray;
    if (event.target.checked) {
      checkArray.push(new FormControl('api/activities/' + event.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == event.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
