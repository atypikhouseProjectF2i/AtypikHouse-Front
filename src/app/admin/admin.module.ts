import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ServicesAccommodationsModalEdit } from './components/services-accommodations-modal-edit/services-accommodations-modal-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesAccommodationsModalNewComponent } from './components/services-accommodations-modal-new/services-accommodations-modal-new.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EquipementsModalEditComponent } from './components/equipements-modal-edit/equipements-modal-edit.component';
import { EquipementsModalNewComponent } from './components/equipements-modal-new/equipements-modal-new.component';
import { ActivitiesModalEditComponent } from './components/activities-modal-edit/activities-modal-edit.component';
import { ActivitiesModalNewComponent } from './components/activities-modal-new/activities-modal-new.component';

@NgModule({
  declarations: [
    AdminComponent,
    ServicesAccommodationsModalEdit,
    ServicesAccommodationsModalNewComponent,
    EquipementsModalEditComponent,
    EquipementsModalNewComponent,
    ActivitiesModalEditComponent,
    ActivitiesModalNewComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  exports: [AdminComponent],
})
export class AdminModule {}
