import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationComponent } from './components/accommodation/accommodation.component';
import { AccommodationListComponent } from './components/accommodation-list/accommodation-list.component';
import { SingleAccommodationComponent } from './components/single-accommodation/single-accommodation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StarRatingModule } from 'angular-star-rating';
import { AccordionModule } from 'primeng/accordion';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { AccommodationsRoutingModule } from './accommodations-routing.module';

@NgModule({
  declarations: [
    AccommodationComponent,
    AccommodationListComponent,
    SingleAccommodationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccommodationsRoutingModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    StarRatingModule.forRoot(),
    AccordionModule,
    CarouselModule,
    ButtonModule,
  ],
  exports: [
    AccommodationListComponent,
    AccommodationComponent,
    SingleAccommodationComponent,
  ],
})
export class AccommodationsModule {}
