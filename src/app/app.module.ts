import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing/landing.page.component'
import { TrainerPage } from './pages/trainer/trainer.page';
import { CataloguePageComponent } from './pages/catalogue/catalogue.page.component';
import { HttpClientModule } from '@angular/common/http';
import { CaughtPokemonListComponent } from './components/caught-pokemon-list/caught-pokemon-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    TrainerPage,
    CaughtPokemonListComponent,
    CataloguePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
