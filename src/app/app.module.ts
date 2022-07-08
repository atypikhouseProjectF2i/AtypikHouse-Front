import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AccommodationComponent } from './accommodation/accommodation.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HostComponent } from './host/host.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import { SingleAccommodationComponent } from './single-accommodation/single-accommodation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { getFrenchPaginator } from './paginator.personnalise';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccommodationComponent,
    HostComponent,
    ContactComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    AccommodationListComponent,
    SingleAccommodationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: getFrenchPaginator(),
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
