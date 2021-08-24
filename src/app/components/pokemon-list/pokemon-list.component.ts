import { Component, OnInit } from '@angular/core';

import { Pokemon } from 'src/app/services/models/pokemon.model';
import { PokemonService } from '../../services/pokemon-service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  private _myPokemon: string[] = [];

  constructor(private readonly pokemonService: PokemonService) { 
    
  }

  ngOnInit(): void {
    this.pokemonService.fetchPokemons();
  }
  get pokemons(): Pokemon[] {
    return this.pokemonService.pokemons();
  }
  public handlePokemonClicked(pokemon: Pokemon):void  {
    if(pokemon.isCaught === false || pokemon.isCaught === undefined){
      pokemon.isCaught = true;
      this._myPokemon.push(pokemon.name);
      localStorage.setItem("pokemon", JSON.stringify(this._myPokemon))
    }else{
      pokemon.isCaught = false;
      this._myPokemon.splice(this._myPokemon.indexOf(pokemon.name), 1);
      localStorage.setItem("pokemon", JSON.stringify(this._myPokemon))
    }
  }

}
