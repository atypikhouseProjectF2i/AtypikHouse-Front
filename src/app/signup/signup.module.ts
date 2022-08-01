import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, ReactiveFormsModule, MatProgressSpinnerModule],
  exports: [SignupComponent],
})
export class SignupModule {}
