import { Component, Inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ServiceAccommodation } from 'src/app/core/models/service-accommodation.model';
import { ServiceAccommodationService } from 'src/app/core/services/service-accommodation.service';
import { MatDialog } from '@angular/material/dialog';
import { ServicesAccommodationsModalEdit } from '../services-accommodations-modal-edit/services-accommodations-modal-edit.component';
import { ServicesAccommodationsModalNewComponent } from '../services-accommodations-modal-new/services-accommodations-modal-new.component';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ChangeDetectorRef } from '@angular/core';
import { Equipement } from 'src/app/core/models/equipement.model';
import { EquipementService } from 'src/app/core/services/equipement.service';
import { EquipementsModalEditComponent } from '../equipements-modal-edit/equipements-modal-edit.component';
import { EquipementsModalNewComponent } from '../equipements-modal-new/equipements-modal-new.component';
import { ActivityService } from 'src/app/core/services/activity.service';
import { Activity } from 'src/app/core/models/activity.model';
import { ActivitiesModalEditComponent } from '../activities-modal-edit/activities-modal-edit.component';
import { ActivitiesModalNewComponent } from '../activities-modal-new/activities-modal-new.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  servicesAccommodations$!: Observable<ServiceAccommodation[]>;
  equipements$!: Observable<Equipement[]>;
  activity$!: Observable<Activity[]>;
  modalContent!: any;
  roles!: any[];
  admin: boolean = false;
  loading$ = this.loader.loading$;

  constructor(
    private serviceAccommodationService: ServiceAccommodationService,
    private equipementService: EquipementService,
    private activityService: ActivityService,
    private dialog: MatDialog,
    private loader: LoadingService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.roles = JSON.parse(sessionStorage.getItem('roles') || '[]');
    this.roles.includes('ROLE_ADMIN')
      ? (this.admin = true)
      : (this.admin = false);

    this.servicesAccommodations$ = this.serviceAccommodationService
      .getAllServices()
      .pipe(map((res: any) => res['hydra:member']));

    this.equipements$ = this.equipementService
      .getAllEquipements()
      .pipe(map((res: any) => res['hydra:member']));

    this.activity$ = this.activityService
      .getAllActivities()
      .pipe(map((res: any) => res['hydra:member']));
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  openDialogEditService(idService: number, name: string): void {
    let dialogRef = this.dialog.open(ServicesAccommodationsModalEdit, {
      width: '400px',
      height: '400px',
      data: { id: idService, name: name },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.servicesAccommodations$ = this.serviceAccommodationService
        .getAllServices()
        .pipe(map((res: any) => res['hydra:member']));
    });
  }

  openDialogNewService(): void {
    let dialogRef = this.dialog.open(ServicesAccommodationsModalNewComponent, {
      width: '400px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.servicesAccommodations$ = this.serviceAccommodationService
        .getAllServices()
        .pipe(map((res: any) => res['hydra:member']));
    });
  }

  onDeleteService(idService: number) {
    if (confirm('Êtes-vous sûr de vouloir créer de supprimer ce service ?')) {
      this.serviceAccommodationService.deleteServiceById(idService).subscribe({
        next: () => {
          this.servicesAccommodations$ = this.serviceAccommodationService
            .getAllServices()
            .pipe(map((res: any) => res['hydra:member']));
        },
      });
    }
  }

  openDialogEditEquipement(idEquipement: number, name: string): void {
    let dialogRef = this.dialog.open(EquipementsModalEditComponent, {
      width: '400px',
      height: '400px',
      data: { id: idEquipement, name: name },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.equipements$ = this.equipementService
        .getAllEquipements()
        .pipe(map((res: any) => res['hydra:member']));
    });
  }

  openDialogNewEquipement(): void {
    let dialogRef = this.dialog.open(EquipementsModalNewComponent, {
      width: '400px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.equipements$ = this.equipementService
        .getAllEquipements()
        .pipe(map((res: any) => res['hydra:member']));
    });
  }

  onDeleteEquipement(idEquipement: number) {
    if (
      confirm('Êtes-vous sûr de vouloir créer de supprimer cet équipement ?')
    ) {
      this.equipementService.deleteEquipementById(idEquipement).subscribe({
        next: () => {
          this.equipements$ = this.equipementService
            .getAllEquipements()
            .pipe(map((res: any) => res['hydra:member']));
        },
      });
    }
  }

  openDialogEditActivity(idActivity: number, name: string): void {
    let dialogRef = this.dialog.open(ActivitiesModalEditComponent, {
      width: '400px',
      height: '400px',
      data: { id: idActivity, name: name },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.activity$ = this.activityService
        .getAllActivities()
        .pipe(map((res: any) => res['hydra:member']));
    });
  }

  openDialogNewActivity(): void {
    let dialogRef = this.dialog.open(ActivitiesModalNewComponent, {
      width: '400px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.activity$ = this.activityService
        .getAllActivities()
        .pipe(map((res: any) => res['hydra:member']));
    });
  }

  onDeleteActivity(idActivity: number) {
    if (
      confirm('Êtes-vous sûr de vouloir créer de supprimer cette activité ?')
    ) {
      this.activityService.deleteActivityById(idActivity).subscribe({
        next: () => {
          this.activity$ = this.activityService
            .getAllActivities()
            .pipe(map((res: any) => res['hydra:member']));
        },
      });
    }
  }
}
