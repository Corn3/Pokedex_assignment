import { Component, OnInit } from '@angular/core';

import { Pokemon } from 'src/app/services/models/pokemon.model';
import { PokemonService } from '../../services/pokemon-service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  constructor(private readonly pokemonService: PokemonService) { 
    
  }

  ngOnInit(): void {
    this.pokemonService.fetchPokemons();
  }
  get pokemons(): Pokemon[] {
    return this.pokemonService.pokemons();
  }

}
