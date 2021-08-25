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
        if(storage.length === undefined) {
            setStorage("party", JSON.stringify([pokemon]))
        }
        else if(storage.length <= 6) {
            for(let i = 0; i < storage.length; i++ ){
                if(storage[i].id === pokemon.id) {
                    alert("Pokemon already in party!");
                    return;
                }
            }
            setStorage("party", JSON.stringify([...storage, pokemon]));
        } else {
            alert("Party at max size (6)")
        }
    }

    get pokemons(): CaughtPokemon[] {
        return this.caughtPokemons;
    }

    get name(): string {
        return this.userName;
    }
}