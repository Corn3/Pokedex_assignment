import { Component, OnInit } from '@angular/core';

import { Pokemon } from 'src/app/models/pokemon.model';
import { setStorage } from 'src/app/storage/storage';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  private _myPokemon: number[] = [];

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
      this._myPokemon.push(pokemon.id);
      setStorage("pokemon", JSON.stringify(this._myPokemon))
    }else{
      pokemon.isCaught = false;
      this._myPokemon.splice(this._myPokemon.indexOf(pokemon.id), 1);
      setStorage("pokemon", JSON.stringify(this._myPokemon))
    }
  }

}
