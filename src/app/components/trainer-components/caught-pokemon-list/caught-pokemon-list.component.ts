import { Component, OnInit } from "@angular/core";
import { CaughtPokemon } from "src/app/models/caughtPokemon.model";
import { PokemonService } from "src/app/services/pokemon.service";
import { SelectedPartyPokemonService } from "src/app/services/selected-caught-pokemon.service";
import { getStorage, setStorage } from "src/app/storage/storage";

@Component({
    selector: "app-caught-pokemon-list",
    templateUrl: "./caught-pokemon-list.component.html",
    styleUrls: ["./caught-pokemon-list.component.css"]
})
export class CaughtPokemonListComponent implements OnInit {

    private caughtPokemons: CaughtPokemon[] = [];

    constructor(
        private readonly pokemonSerive: PokemonService,
        private readonly selectedPokemonService: SelectedPartyPokemonService
        ) { }
    private userName: string = "";

    ngOnInit() {
        this.userName = getStorage("trainer");
        const pokemons: number[] = JSON.parse(getStorage("pokemon"));
        this.pokemonSerive.fetchCaughtPokemons(pokemons);
        this.caughtPokemons = this.pokemonSerive.getCaughtPokemons();
    }

    public handlePokemonClicked(pokemon: CaughtPokemon) {
        this.selectedPokemonService.addPokemon(pokemon);
    }

    get pokemons(): CaughtPokemon[] {
        return this.caughtPokemons;
    }

    get name(): string {
        return this.userName;
    }
}