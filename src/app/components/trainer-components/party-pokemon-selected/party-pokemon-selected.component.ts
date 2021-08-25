import { Component } from "@angular/core";
import { CaughtPokemon } from "src/app/models/caughtPokemon.model";
import { getStorage } from "src/app/storage/storage";

@Component({
    selector: "app-pokemon-party",
    templateUrl: "./party-pokemon-selected.component.html",
    styleUrls: ["./party-pokemon-selected.component.css"]
})
export class PartyPokemonSelectedComponent {

    get pokemons(): CaughtPokemon[] {
        return JSON.parse(getStorage("party"));
    }

}