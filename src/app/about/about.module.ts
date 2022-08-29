import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './components/about/about.component';
import { UpdateAboutComponent } from './components/update-about/update-about.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CguComponent } from './components/cgu/cgu.component';
import { LegalNoticesComponent } from './components/legal-notices/legal-notices.component';

@NgModule({
  declarations: [
    AboutComponent,
    UpdateAboutComponent,
    CguComponent,
    LegalNoticesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AboutRoutingModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    AboutComponent,
    UpdateAboutComponent,
    CguComponent,
    LegalNoticesComponent,
  ],
})
export class AboutModule {}
