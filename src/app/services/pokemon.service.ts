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

    constructor(private readonly http: HttpClient) {}

    /**
     * Saves all first gen pokemon to a private array
     */
     public fetchPokemons(): void {
        this.http.get('https://pokeapi.co/api/v2/pokemon/?limit=151')
        .subscribe((data: any) => {
            this._pokemons = data.results;
            this.fetchPokemonStats();
        }, (error: HttpErrorResponse) => {
            this._error = error.message;
        })
    }

    /**
     * Loops through the private pokemon array and fetches the id. 
     * Then adds the id and image to the Pokemon object.
     */
    public fetchPokemonStats(): void {
        this._pokemons.forEach(element => {
            element.name = this.capitalizeFirstLetter(element.name);
            element.isCaught = false;
            this.http.get(element.url)
                .subscribe((data: any) => {
                element.id = data.id;
                element.image = "../../../assets/gen1-sprites/" + data.id + ".png";
            }, (error: HttpErrorResponse) => {
                this._error = error.message;
            })           
        });
    }

    public getPokemon (pokemon: string): any {
        let ret = null;
        this._pokemons.forEach((element: Pokemon) => {
            if(element.name === pokemon) {
                ret = element;
            }
        })
        return ret;
    }

    private capitalizeFirstLetter(name: string): string {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    public fetchCaughtPokemons(pokemons: number[]): void {
        this.caughtPokemons = [];
        if (pokemons.length > 0) {
            for (let i = 0; i < pokemons.length; i++) {
                this.http.get<CaughtPokemon[]>(this.DEFAULT_URL + pokemons[i])
                    .subscribe((data) => {
                        const pokemon: CaughtPokemon = this.getCaughtPokemon(data, pokemons[i]);
                        this.caughtPokemons.splice(i, 0, pokemon);
                    }, (error: HttpErrorResponse) => {
                        this._error = error.message;
                    });
            }
        }
    }

    private getCaughtPokemon(data: any, id: number) {
        let name: string = this.capitalizeFirstLetter(data.forms[0].name);
        const animatedAvatar = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
        const types = this.getTypes(data);
        return { name, id, types, animatedAvatar }
    }

    private getTypes(pokemon: any) {
        let types: string[] = [];
        for (const dataType of pokemon.types) {
            types.push(this.capitalizeFirstLetter(dataType.type.name));
        }
        return types;
    }

    public getCaughtPokemons(): CaughtPokemon[] {
        this.caughtPokemons.sort((a, b) => a.id - b.id);
        return this.caughtPokemons;
    }

    public pokemons(): Pokemon[] {
        return this._pokemons;
    }
    public error(): string {
        return this._error;
    }
}