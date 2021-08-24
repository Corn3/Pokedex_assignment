import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Pokemon } from "src/app/models/pokemon.model";

@Injectable({
    providedIn: "root"
})
export class PokemonService {
    private caughtPokemons: Pokemon[] = [];
    private DEFAUL_URL: string = "https://pokeapi.co/api/v2/pokemon/";
    private error: string = "";

    constructor(private readonly http: HttpClient) { }

    public fetchCaughtPokemons(pokemons: string[]): void {
        for(const pokemonName of pokemons) {
            this.http.get<Pokemon[]>(this.DEFAUL_URL + pokemonName)
            .subscribe((data: any) => {
                const name = pokemonName;
                const animatedAvatar = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
                let types: string[] = [];
                for(const dataType of data.types) {
                    types.push(dataType.type.name);
                }
                const pokemon: Pokemon = { name, types, animatedAvatar };
                this.caughtPokemons.push(pokemon)
            }, (error: HttpErrorResponse) => {
                this.error = error.message;
            });
        }
    }

    public getCaughtPokemons(): Pokemon[] {
        return this.caughtPokemons;
    }

}