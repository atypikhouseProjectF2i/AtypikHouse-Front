import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import { AccountComponent } from './account/account.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { HostComponent } from './host/host.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SingleAccommodationComponent } from './single-accommodation/single-accommodation.component';

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
