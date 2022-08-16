import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'hebergements',
    loadChildren: () =>
      import('./accommodations/accommodations.module').then(
        (mod) => mod.AccommodationsModule
      ),
  },
  {
    path: 'connexion',
    loadChildren: () =>
      import('./login/login.module').then((mod) => mod.LoginModule),
  },
  {
    path: 'mon-compte',
    loadChildren: () =>
      import('./account/account.module').then((mod) => mod.AccountModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contact.module').then((mod) => mod.ContactModule),
  },
  {
    path: 'hote',
    loadChildren: () =>
      import('./host/host.module').then((mod) => mod.HostModule),
  },
  {
    path: 'inscription',
    loadChildren: () =>
      import('./signup/signup.module').then((mod) => mod.SignupModule),
  },
  {
    path: 'reservation',
    loadChildren: () =>
      import('./booking/booking.module').then((mod) => mod.BookingModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
