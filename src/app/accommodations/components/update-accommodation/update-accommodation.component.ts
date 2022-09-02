import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {Observable, tap, map, switchMap} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AccommodationService} from 'src/app/core/services/accommodation.service';
import {LoadingService} from 'src/app/core/services/loading.service';
import {ActivityService} from 'src/app/core/services/activity.service';
import {Activity} from 'src/app/core/models/activity.model';
import {ServiceAccommodation} from 'src/app/core/models/service-accommodation.model';
import {ServiceAccommodationService} from 'src/app/core/services/service-accommodation.service';
import {TypeAccommodationService} from 'src/app/core/services/type-accommodation.service';
import {TypeAccommodation} from 'src/app/core/models/type-accommodation.model';
import {Equipement} from 'src/app/core/models/equipement.model';
import {EquipementService} from 'src/app/core/services/equipement.service';
import {Region} from 'src/app/core/models/region.model';
import {RegionService} from 'src/app/core/services/region.service';
import {AuthService} from "../../../core/services/auth.service";
import {response} from "express";

@Component({
  selector: 'app-update-accommodation',
  templateUrl: './update-accommodation.component.html',
  styleUrls: ['./update-accommodation.component.scss'],
})
export class UpdateAccommodationComponent implements OnInit {
  updateAccommodationForm!: FormGroup;
  idAccommodation!: number;
  idUser!: number;
  isHost: boolean = false;
  updateAccommodation$!: Observable<any>;
  activity$!: Observable<Activity[]>;
  serviceAccommodation$!: Observable<ServiceAccommodation[]>;
  typeAccommodation$!: Observable<TypeAccommodation[]>;
  equipementAccommodation$!: Observable<Equipement[]>;
  regions$!: Observable<Region[]>;
  loading$ = this.loader.loading$;
  activityCheck!: any;
  serviceAccoCheck!: any;
  equipementCheck!: any;
  pathImage!: string;
  altImage!: string;
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
    this.idAccommodation = +this.activedRoute.snapshot.params['id'];

    this.accommodationService.getAccommodationById(this.idAccommodation)
      .pipe(
        tap((response: any) => {
          this.idUser = response.user?.id
        }),
        switchMap(() => (
            this.authService.getUser()
              .pipe(
                map((response: any) => (
                  this.idUser === response?.id ? this.isHost = true : this.isHost = false
                ))
              )
          )
        )
      ).subscribe({
      next: () => {

        if (this.isHost) {
          this.updateAccommodation$ = this.accommodationService
            .getAccommodationById(this.idAccommodation)
            .pipe(
              tap((response) => {
                  this.updateAccommodationForm.patchValue(response);
                  this.pathImage =
                    this.accommodationService.pathImage + response.imageUrl;
                  this.altImage = response.name;

                  this.updateAccommodationForm
                    .get('region')
                    ?.patchValue('api/regions/' + response.region.id);

                  this.updateAccommodationForm
                    .get('typeAccommodation')
                    ?.patchValue('api/type_accommodations/' + response.typeAccommodation?.id)

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
                  if (response.activity!.length > 0) {
                    response.activity?.forEach((data: any) => {
                      checkArrayActivity.push(
                        new FormControl('api/activities/' + data.id)
                      );
                    });
                  }

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
                  if (response.serviceAcco!.length > 0) {
                    response.serviceAcco?.forEach((data: any) => {
                      checkArrayService.push(
                        new FormControl('api/service_accos/' + data.id)
                      );
                    });
                  }

                  //enabled check for service
                  this.equipementCheck = (idEquipement: number): any => {
                    for (let i = 0; i < response.equipement?.length!; i++) {
                      if (response.equipement![i].id === idEquipement) {
                        return true;
                      }
                    }
                  };
                  const checkArrayEquipement: FormArray = this.updateAccommodationForm
                    .controls['equipement'] as FormArray;
                  console.log(response.equipement)
                  if (response.equipement!.length > 0) {
                    response.equipement?.forEach((data: any) => {
                      checkArrayEquipement.push(
                        new FormControl('api/equipements/' + data.id)
                      );
                    });
                  }
                }
              )
            );

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
            equipement: new FormArray([]),
          });
        }

      }
    })

  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  onSubmit() {
    console.log(this.updateAccommodationForm.value.equipement);
    this.accommodationService.putAccommodationById(
      this.updateAccommodationForm.value,
      this.idAccommodation).subscribe({
        next: () => {
          this.isSuccess = true
        }
      }
    )
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

  onCheckboxChangeEquipement(event: any) {
    const checkArrayEquipement: FormArray = this.updateAccommodationForm
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

        this.accommodationService
          .uploadImage(formData, this.idAccommodation)
          .subscribe({
            next: (data: any) => {
              this.pathImage =
                this.accommodationService.pathImage + data.imageUrl;
              this.successUploadFile = true;
            },
          });
      } else {
        this.errorTypeFile = true;
      }
    }
  }

  changeRegion(event: any) {
    this.updateAccommodationForm
      .get('region')
      ?.setValue(event.target.value, {onlySelf: true});
  }

  changeType(event: any) {
    this.updateAccommodationForm
      .get('typeAccommodation')
      ?.setValue(event.target.value, {onlySelf: true});
  }
}
