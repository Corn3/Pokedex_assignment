import { Component, ComponentFactoryResolver, OnInit } from "@angular/core";
import { CaughtPokemon } from "src/app/models/caughtPokemon.model";
import { PokemonService } from "src/app/services/pokemon.service";
import { getStorage, setStorage } from "src/app/storage/storage";

@Component({
    selector: "app-caught-pokemon-list",
    templateUrl: "./caught-pokemon-list.component.html",
    styleUrls: ["./caught-pokemon-list.component.css"]
})
export class CaughtPokemonListComponent implements OnInit {

    private caughtPokemons: CaughtPokemon[] = [];

    constructor(
        private readonly pokemonSerive: PokemonService
    ) { }
    private userName: string = "";

    /**
     * Fetches data from external API with data from localstorage, and sets the
     * local variable to it.
     */
    ngOnInit() {
        this.userName = getStorage("trainer");
        const pokemons: number[] = JSON.parse(getStorage("pokemon"));
        this.pokemonSerive.fetchCaughtPokemons(pokemons);
        this.caughtPokemons = this.pokemonSerive.getCaughtPokemons();
    }

    /**
     * Adds the clicked pokemon to the pokemon party, based on if there is any room,
     * or if the pokemon is already in the party.
     * 
     * @param pokemon The pokemon to be added to the party on click.
     * @returns This function always returns when a pokemon has been successfully
     * added or if it fails at some point.
     */
    public handlePokemonClicked(pokemon: CaughtPokemon) {
        const storage: CaughtPokemon[] = JSON.parse(getStorage("party"));
        if (storage.length === undefined) {
            setStorage("party", JSON.stringify([pokemon]));
            return;
        } else if (storage[5].id !== 0) {
            alert("You already Have 6 pokemons in party.");
            return;
        }
        for (let i = 0; i < 6; i++) {
            if (storage[i].id === pokemon.id) {
                alert("Pokemon already in party!");
                return;
            }
            else if(storage[i].id === 0) {
                storage[i] = pokemon;
                storage.splice(storage.length, 1);
                setStorage("party", JSON.stringify(storage));
                return;
            }
            
        }
    }

    get pokemons(): CaughtPokemon[] {
        return this.caughtPokemons;
    }

    get name(): string {
        return this.userName;
    }
}