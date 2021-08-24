import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing/landing.page.component'
import { TrainerPageComponent } from './pages/trainer/trainer-page.component';
import { CataloguePageComponent } from './pages/catalogue/catalogue.page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    TrainerPageComponent,
    CataloguePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
