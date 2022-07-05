import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import { ContactComponent } from './contact/contact.component';
import { HostComponent } from './host/host.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'hebergements', component: AccommodationListComponent },
  { path: 'hote', component: HostComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'inscription', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
