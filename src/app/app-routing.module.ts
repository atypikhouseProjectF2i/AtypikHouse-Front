import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationListComponent } from './accommodations/components/accommodation-list/accommodation-list.component';
import { AccountComponent } from './account/components/account/account.component';
import { ContactComponent } from './contact/components/contact/contact.component';
import { HomeComponent } from './home/components/home/home.component';
import { HostComponent } from './host/components/host/host.component';
import { LoginComponent } from './login/components/login/login.component';
import { SignupComponent } from './signup/components/signup/signup.component';
import { SingleAccommodationComponent } from './accommodations/components/single-accommodation/single-accommodation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hebergements', component: AccommodationListComponent },
  { path: 'hebergements/:id', component: SingleAccommodationComponent },
  { path: 'hote', component: HostComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'inscription', component: SignupComponent },
  { path: 'mon-compte', component: AccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
