import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule, NgbModule],
  exports: [AdminComponent],
})
export class AdminModule {}
