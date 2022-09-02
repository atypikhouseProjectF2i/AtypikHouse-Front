import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationListComponent } from './components/accommodation-list/accommodation-list.component';
import { SingleAccommodationComponent } from './components/single-accommodation/single-accommodation.component';
import { UpdateAccommodationComponent } from './components/update-accommodation/update-accommodation.component';
import {NewAccommodationComponent} from "./components/new-accommodation/new-accommodation.component";

const routes: Routes = [
  { path: '', component: AccommodationListComponent },
  { path: 'creer-un-nouveau-hebergement', component: NewAccommodationComponent },
  { path: ':id', component: SingleAccommodationComponent },
  { path: 'modifier-un-hebergement/:id', component: UpdateAccommodationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccommodationsRoutingModule {}
