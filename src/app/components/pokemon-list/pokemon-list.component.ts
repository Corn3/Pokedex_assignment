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
    if(localStorage.getItem("pokemon") === null) {
      localStorage.setItem("pokemon", JSON.stringify(this._myPokemon))
    }else {
      let temp = (localStorage.getItem("pokemon"))?.split(",");
      temp?.forEach((element: string) => {
          let tempPokemon = element.split(" "); 
          let pokemonName = tempPokemon[0].replace(/[^a-zA-Z/]/g, "");
          this._myPokemon.push(this.pokemonService.getPokemon(pokemonName).name + " " + this.pokemonService.getPokemon(pokemonName).id);
      });
    }
}
  get pokemons(): Pokemon[] {
    return this.pokemonService.pokemons();
  }
  /**
   * If isCaught === false: Sets isCaught to true and adds pokemon name and id to localStorage
   * else: set isCaught to false and removes from localStorage
   * @param pokemon 
   */
  public handlePokemonClicked(pokemon: Pokemon):void  {
    if(pokemon.isCaught === false || pokemon.isCaught === undefined){
      pokemon.isCaught = true;
      this._myPokemon.push(pokemon.name + " " + pokemon.id);
      localStorage.setItem("pokemon", JSON.stringify(this._myPokemon))
    }else{
      pokemon.isCaught = false;
      this._myPokemon.splice(this._myPokemon.indexOf(pokemon.name +" " + pokemon.id), 1)
      localStorage.setItem("pokemon", JSON.stringify(this._myPokemon))
    }
  }

}
