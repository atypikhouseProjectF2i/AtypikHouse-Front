import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AccommodationService} from "../../../core/services/accommodation.service";
import {ActivityService} from "../../../core/services/activity.service";
import {ServiceAccommodationService} from "../../../core/services/service-accommodation.service";
import {TypeAccommodationService} from "../../../core/services/type-accommodation.service";
import {EquipementService} from "../../../core/services/equipement.service";
import {RegionService} from "../../../core/services/region.service";
import {AuthService} from "../../../core/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {LoadingService} from "../../../core/services/loading.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {Activity} from "../../../core/models/activity.model";
import {ServiceAccommodation} from "../../../core/models/service-accommodation.model";
import {TypeAccommodation} from "../../../core/models/type-accommodation.model";
import {Equipement} from "../../../core/models/equipement.model";
import {Region} from "../../../core/models/region.model";

@Component({
  selector: 'app-new-accommodation',
  templateUrl: './new-accommodation.component.html',
  styleUrls: ['./new-accommodation.component.scss']
})
export class NewAccommodationComponent implements OnInit {

  createAccommodationForm!: FormGroup;
  idAccommodation!: number;
  idUser!: number;
  isLogged: boolean = false;
  activity$!: Observable<Activity[]>;
  serviceAccommodation$!: Observable<ServiceAccommodation[]>;
  typeAccommodation$!: Observable<TypeAccommodation[]>;
  equipementAccommodation$!: Observable<Equipement[]>;
  regions$!: Observable<Region[]>;
  loading$ = this.loader.loading$;
  pathImage!: string;
  fileName!: string;
  errorTypeFile: boolean = false;
  successUploadFile: boolean = false;
  isSuccess: boolean = false;

  constructor(
    private accommodationService: AccommodationService,
    private activityService: ActivityService,
    private serviceAccommodationService: ServiceAccommodationService,
    private typeAccommodationService: TypeAccommodationService,
    private equipementService: EquipementService,
    private regionService: RegionService,
    private authService: AuthService,
    private activedRoute: ActivatedRoute,
    private loader: LoadingService,
    private ref: ChangeDetectorRef,
    private formBuiler: FormBuilder
  ) {
  }

  ngOnInit(): void {
    const token = this.authService.getToken();

    token ? this.isLogged = true : this.isLogged = false

    this.createAccommodationForm = this.formBuiler.group({
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
      equipement: new FormArray([]),
      file: [null, [Validators.required]]
    });


    this.activity$ = this.activityService
      .getAllActivities()
      .pipe(map((res: any) => res['hydra:member']));

    this.serviceAccommodation$ = this.serviceAccommodationService
      .getAllServices()
      .pipe(map((res: any) => res['hydra:member']));

    this.equipementAccommodation$ = this.equipementService
      .getAllEquipements()
      .pipe(map((res: any) => res['hydra:member']));

    this.regions$ = this.regionService
      .getAllRegions()
      .pipe(map((res: any) => res['hydra:member']));

    this.typeAccommodation$ = this.typeAccommodationService
      .getAllTypes()
      .pipe(map((res: any) => res['hydra:member']))
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  onSubmit() {
    console.log(this.createAccommodationForm.value);
    if (this.createAccommodationForm.valid) {
    }
  }

  onCheckboxChangeActivity(event: any) {
    const checkArrayActivity: FormArray = this.createAccommodationForm.controls[
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
    const checkArrayService: FormArray = this.createAccommodationForm.controls[
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

  onCheckboxChangeEquipement(event: any) {
    const checkArrayEquipement: FormArray = this.createAccommodationForm
      .controls['equipement'] as FormArray;
    if (event.target.checked) {
      checkArrayEquipement.push(
        new FormControl('api/equipements/' + event.target.value)
      );
    } else {
      const index = checkArrayEquipement.controls.findIndex(
        (x) => x.value === event.target.value
      );
      checkArrayEquipement.removeAt(index);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      if (file.type.includes('image/')) {
        this.fileName = file.name;
        const formData = new FormData();

        formData.append('file', file);

      } else {
        this.errorTypeFile = true;
      }
    }
  }

  changeRegion(event: any) {
    this.createAccommodationForm
      .get('region')
      ?.setValue(event.target.value, {onlySelf: true});
  }

  changeType(event: any) {
    this.createAccommodationForm
      .get('typeAccommodation')
      ?.setValue(event.target.value, {onlySelf: true});
  }

}
