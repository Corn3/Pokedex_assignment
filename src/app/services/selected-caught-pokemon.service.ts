import { Injectable } from "@angular/core";
import { CaughtPokemon } from "../models/caughtPokemon.model";

@Injectable({
    providedIn: "root"
})
export class SelectedPartyPokemonService {
    private caughtPokemons: CaughtPokemon[] = [];
    private maxLength: number = 6;

    public addPokemon(pokemon: CaughtPokemon): void {
        if(this.caughtPokemons.length < this.maxLength) {
            this.caughtPokemons.push(pokemon);
        } else {
            alert("You can have a maximum of 6 party pokemons.")
        }
    }

    public getPartyPokemon(): CaughtPokemon[] {
        return this.caughtPokemons;
    }

}