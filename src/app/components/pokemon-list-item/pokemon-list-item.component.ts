import { EventEmitter, OnInit, Output } from '@angular/core';
import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/services/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent implements OnInit {
  @Input() pokemon: Pokemon | undefined;
  @Output() clicked: EventEmitter<Pokemon> = new EventEmitter();

  ngOnInit(): void {
    let temp = (localStorage.getItem("pokemon"))?.split(",");
    temp?.forEach((element: string) => {
      let tempPokemon = element.split(" ");
      let pokemonName = tempPokemon[0].replace(/[^a-zA-Z/]/g, "");

      if (pokemonName === this.pokemon?.name) {
        this.pokemon.isCaught = true;
      }
    });
  }

  public handlePokemonClicked(): void {
    this.clicked.emit(this.pokemon);
  }
}
