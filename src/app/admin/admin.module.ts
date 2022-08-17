import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule, MatTableModule],
  exports: [AdminComponent],
})
export class AdminModule {}
