import { EventEmitter, Output, OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { getStorage } from 'src/app/storage/storage';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent implements OnInit {
  @Input() pokemon: Pokemon | undefined;
  @Output() clicked: EventEmitter<Pokemon> = new EventEmitter();

  ngOnInit(): void {
    let temp = JSON.parse(getStorage("pokemon"));
    temp?.forEach((element: number) => {

      if (element === this.pokemon?.id) {
        this.pokemon.isCaught = true;
      }
    });
  }

  public handlePokemonClicked(): void {
    this.clicked.emit(this.pokemon);
  }
}
