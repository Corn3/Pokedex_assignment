import { Component } from "@angular/core";
import { CaughtPokemon } from "src/app/models/caughtPokemon.model";
import { SelectedPartyPokemonService } from "src/app/services/selected-caught-pokemon.service";

@Component({
    selector: "app-pokemon-party",
    templateUrl: "./party-pokemon-selected.component.html",
    styleUrls: ["./party-pokemon-selected.component.css"]
})
export class PartyPokemonSelectedComponent {

    constructor(private readonly selectedPartyPokemonService: SelectedPartyPokemonService) {}

    private caughtPokemons: CaughtPokemon[] = [];
    private maxLength: number = 6;

    public addPokemon(pokemon: CaughtPokemon): void {
        if(this.caughtPokemons.length <= this.maxLength)
            this.caughtPokemons.push(pokemon);
        else {
            alert("You can have a maximum of 6 party pokemons.")
        }
    }

    get pokemons(): CaughtPokemon[] {
        return this.selectedPartyPokemonService.getPartyPokemon();
    }

}