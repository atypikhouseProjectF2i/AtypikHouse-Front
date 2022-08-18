import { Component, Inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ServiceAccommodation } from 'src/app/core/models/service-accommodation.model';
import { ServicesAccommodationService } from 'src/app/core/services/services-accommodations.service';
import { MatDialog } from '@angular/material/dialog';
import { ServicesAccommodationsModalEdit } from '../services-accommodations/services-accommodations-modal-edit.component';
import { ServicesAccommodationsModalNewComponent } from '../services-accommodations-modal-new/services-accommodations-modal-new.component';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  servicesAccommodations$!: Observable<ServiceAccommodation[]>;
  modalContent!: any;
  roles!: any[];
  admin: boolean = false;
  loading$ = this.loader.loading$;

  constructor(
    private servicesAccommodationsService: ServicesAccommodationService,
    private dialog: MatDialog,
    private loader: LoadingService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.roles = JSON.parse(sessionStorage.getItem('roles') || '[]');
    this.roles.includes('ROLE_ADMIN')
      ? (this.admin = true)
      : (this.admin = false);

    this.servicesAccommodations$ = this.servicesAccommodationsService
      .getAllServices()
      .pipe(map((res: any) => res['hydra:member']));
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  openDialogEdit(idService: number, name: string): void {
    let dialogRef = this.dialog.open(ServicesAccommodationsModalEdit, {
      width: '400px',
      height: '400px',
      data: { id: idService, name: name },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.servicesAccommodations$ = this.servicesAccommodationsService
        .getAllServices()
        .pipe(map((res: any) => res['hydra:member']));
    });
  }

  openDialogNew(): void {
    let dialogRef = this.dialog.open(ServicesAccommodationsModalNewComponent, {
      width: '400px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.servicesAccommodations$ = this.servicesAccommodationsService
        .getAllServices()
        .pipe(map((res: any) => res['hydra:member']));
    });
  }

  onDelete(idService: number) {
    if (confirm('Êtes-vous sûr de vouloir créer de supprimer ce service ?')) {
      this.servicesAccommodationsService
        .deleteServiceById(idService)
        .subscribe({
          next: () => {
            this.servicesAccommodations$ = this.servicesAccommodationsService
              .getAllServices()
              .pipe(map((res: any) => res['hydra:member']));
          },
        });
    }
  }
}
