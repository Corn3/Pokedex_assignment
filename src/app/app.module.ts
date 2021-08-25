import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing/landing.page.component'
import { TrainerPage } from './pages/trainer/trainer.page';
import { CataloguePageComponent } from './pages/catalogue/catalogue.page.component';
import { HttpClientModule } from '@angular/common/http';
import { CaughtPokemonListComponent } from './components/trainer-components/caught-pokemon-list/caught-pokemon-list.component';
import { PartyPokemonSelectedComponent } from './components/trainer-components/party-pokemon-selected/party-pokemon-selected.component';
import { PokemonListComponent } from './components/catalogue-components/pokemon-list/pokemon-list.component';
import { PokemonListItemComponent } from './components/catalogue-components/pokemon-list-item/pokemon-list-item.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CaughtPokemonListItemComponent } from './components/trainer-components/caught-pokemon-list-item/caught-pokemon-list-item.component';
import { CaughtPokemonTypeComponent } from './components/trainer-components/caught-pokemon-type-item/caught-pokemon-type-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    TrainerPage,
    CaughtPokemonListComponent,
    PartyPokemonSelectedComponent,
    CaughtPokemonListItemComponent,
    CaughtPokemonTypeComponent,
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
