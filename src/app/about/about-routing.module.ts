import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CguComponent } from './components/cgu/cgu.component';
import { LegalNoticesComponent } from './components/legal-notices/legal-notices.component';
import { UpdateAboutComponent } from './components/update-about/update-about.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'modifier', component: UpdateAboutComponent },
  { path: 'cgu', component: CguComponent },
  { path: 'mentions-legales', component: LegalNoticesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
