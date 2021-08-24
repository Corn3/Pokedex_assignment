import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing/landing.page.component'
import { TrainerPageComponent } from './pages/trainer/trainer.page.component';
import { CataloguePageComponent } from './pages/catalogue/catalogue.page.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonListItemComponent } from './components/pokemon-list-item/pokemon-list-item.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    TrainerPageComponent,
    CataloguePageComponent,
    PokemonListComponent,
    PokemonListItemComponent,
    NavbarComponent
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
