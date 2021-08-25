import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Pokemon } from "../models/pokemon.model";
import { CaughtPokemon } from "../models/caughtPokemon.model";

@Injectable({
    providedIn: 'root'
})
export class PokemonService {

    private _pokemons: Pokemon[] = [];
    private _error: string = "";
    private caughtPokemons: CaughtPokemon[] = [];
    private DEFAULT_URL: string = "https://pokeapi.co/api/v2/pokemon/";
    private DEFAULT_IMG_PATH: string = `src/assets/gen1-sprites/`

    constructor(private readonly http: HttpClient) {

    }
    public fetchPokemons(): void {
        this.http.get(this.DEFAULT_URL + '?limit=151')
            .subscribe((data: any) => {
                this._pokemons = data.results;
                this.fetchPokemonStats();
            }, (error: HttpErrorResponse) => {
                this._error = error.message;
            })
    }
    public fetchPokemonStats(): void {
        this._pokemons.forEach(element => {
            element.name = this.capitalizeFirstLetter(element.name);
            element.isCaught = false;
            this.http.get(element.url)
                .subscribe((data: any) => {
                    element.id = data.id;
                }, (error: HttpErrorResponse) => {
                    this._error = error.message;
                })
        });
    }

    private capitalizeFirstLetter(name: string): string {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    public fetchCaughtPokemons(pokemons: number[]): void {
        this.caughtPokemons = [];
        if (pokemons.length > 0) {

            for (const pokemonId of pokemons) {
                this.http.get<Pokemon[]>(this.DEFAULT_URL + pokemonId)
                    .subscribe((data: any) => {
                        const pokemon: CaughtPokemon = this.getPokemon(data, pokemonId);
                        this.caughtPokemons.push(pokemon)
                    }, (error: HttpErrorResponse) => {
                        this._error = error.message;
                    });
            }
        }
    }

    getPokemon(data: any, id: number) {
        let name: string = this.capitalizeFirstLetter(data.forms[0].name);
        const animatedAvatar = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
        const types = this.getTypes(data);
        return { name, id, types, animatedAvatar }
    }

    getTypes(pokemon: any) {
        let types: string[] = [];
        for (const dataType of pokemon.types) {
            types.push(this.capitalizeFirstLetter(dataType.type.name));
        }
        return types;
    }

    public getCaughtPokemons(): CaughtPokemon[] {
        return this.caughtPokemons;
    }

    public pokemons(): Pokemon[] {
        return this._pokemons;
    }
    public error(): string {
        return this._error;
    }
}