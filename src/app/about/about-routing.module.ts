import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { UpdateAboutComponent } from './components/update-about/update-about.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'modifier', component: UpdateAboutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
