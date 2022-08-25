import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostComponent } from './components/host/host.component';
import { HostRoutingModule } from './host-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccommodationsModule } from '../accommodations/accommodations.module';

@NgModule({
  declarations: [HostComponent],
  imports: [
    CommonModule,
    HostRoutingModule,
    MatProgressSpinnerModule,
    AccommodationsModule,
  ],
  exports: [HostComponent],
})
export class HostModule {}
