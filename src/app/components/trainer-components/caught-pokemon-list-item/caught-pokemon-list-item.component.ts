import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CaughtPokemon } from "src/app/models/caughtPokemon.model";

@Component({
    selector: "app-caught-pokemon-list-item",
    templateUrl: "./caught-pokemon-list-item.component.html",
    styleUrls: ["./caught-pokemon-list-item.component.css"]
})
export class CaughtPokemonListItemComponent {
    @Input() pokemon: CaughtPokemon | undefined;
    @Output() clicked: EventEmitter<CaughtPokemon> = new EventEmitter();

    public onPokemonClicked(): void {
        this.clicked.emit(this.pokemon);
    }
}