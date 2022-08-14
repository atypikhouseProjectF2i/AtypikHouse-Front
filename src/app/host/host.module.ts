import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostComponent } from './components/host/host.component';
import { HostRoutingModule } from './host-routing.module';

@NgModule({
  declarations: [HostComponent],
  imports: [CommonModule, HostRoutingModule],
  exports: [HostComponent],
})
export class HostModule {}
