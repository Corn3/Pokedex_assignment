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

    ngOnInit() {
        this.userName = getStorage("trainer");
        const pokemons: number[] = JSON.parse(getStorage("pokemon"));
        this.pokemonSerive.fetchCaughtPokemons(pokemons);
        this.caughtPokemons = this.pokemonSerive.getCaughtPokemons();
    }

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