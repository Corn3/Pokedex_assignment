import { Component, OnInit } from "@angular/core";
import { Pokemon } from "src/app/models/pokemon.model";
import { PokemonService } from "src/app/services/pokemon.service";
import { getStorage, setStorage } from "src/app/storage/storage";

@Component({
    selector: "app-caught-pokemon-list",
    templateUrl: "./caught-pokemon-list.component.html",
    styleUrls: ["./caught-pokemon-list.component.css"]
})
export class CaughtPokemonListComponent implements OnInit {
    constructor(private readonly pokemonSerive: PokemonService) { }
    private userName: string = "";

    ngOnInit() {
        this.userName = getStorage("trainer");
        const pokemons: string[] = JSON.parse(getStorage("caught-pokemons"))
        this.pokemonSerive.fetchCaughtPokemons(pokemons)
    }

    get caughtPokemons(): Pokemon[] {
        return this.pokemonSerive.getCaughtPokemons();
    }

    get name(): string {
        return this.userName;
    }
}