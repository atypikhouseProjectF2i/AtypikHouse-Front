import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationListComponent } from './components/accommodation-list/accommodation-list.component';
import { SingleAccommodationComponent } from './components/single-accommodation/single-accommodation.component';
import { UpdateAccommodationComponent } from './components/update-accommodation/update-accommodation.component';

const routes: Routes = [
  { path: '', component: AccommodationListComponent },
  { path: ':id', component: SingleAccommodationComponent },
  { path: 'modifier/:id', component: UpdateAccommodationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccommodationsRoutingModule {}
