import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule],
  exports: [SignupComponent],
})
export class SignupModule {}
