import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostComponent } from './components/host/host.component';

@NgModule({
  declarations: [HostComponent],
  imports: [CommonModule],
  exports: [HostComponent],
})
export class HostModule {}
