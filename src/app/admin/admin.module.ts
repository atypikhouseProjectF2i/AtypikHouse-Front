import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ServicesAccommodationsModalEdit } from './components/services-accommodations/services-accommodations-modal-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesAccommodationsModalNewComponent } from './components/services-accommodations-modal-new/services-accommodations-modal-new.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AdminComponent,
    ServicesAccommodationsModalEdit,
    ServicesAccommodationsModalNewComponent,
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
