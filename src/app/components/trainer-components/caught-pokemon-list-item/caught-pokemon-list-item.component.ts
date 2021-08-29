import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CaughtPokemon } from "src/app/models/caughtPokemon.model";
import { getStorage } from "src/app/storage/storage";

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

    public isInParty(): boolean {
        const party: CaughtPokemon[] = (JSON.parse(getStorage("party")));
        for(const partyPokemon of party) {
            if(partyPokemon.id === this.pokemon?.id)
                return true;
        }
        return false;
    }
}