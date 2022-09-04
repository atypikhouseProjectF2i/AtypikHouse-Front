import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './components/home/home.component';
import {MatDialogModule} from "@angular/material/dialog";
import {CookieComponent} from "./components/cookie/cookie.component";


@NgModule({
  declarations: [HomeComponent, CookieComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [HomeComponent, CookieComponent],
})
export class HomeModule {
}
