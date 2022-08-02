import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AccommodationsModule } from './accommodations/accommodations.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HostModule } from './host/host.module';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { AccountModule } from './account/account.module';
import { ContactModule } from './contact/contact.module';
import { SignupModule } from './signup/signup.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CoreModule,
    HomeModule,
    AccommodationsModule,
    HostModule,
    LoginModule,
    SignupModule,
    AccountModule,
    ContactModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
