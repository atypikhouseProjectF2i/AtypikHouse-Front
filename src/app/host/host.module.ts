import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostComponent } from './components/host/host.component';
import { HostRoutingModule } from './host-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [HostComponent],
  imports: [CommonModule, HostRoutingModule, MatProgressSpinnerModule],
  exports: [HostComponent],
})
export class HostModule {}
