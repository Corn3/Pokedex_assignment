import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Pokemon } from "../models/pokemon.model";
import { CaughtPokemon } from "../models/caughtPokemon.model";
import { getStorage } from "../storage/storage";

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
     * If the pokemon exists in local storage, isCaught is set to true.
    */
    public fetchPokemonStats(): void {
        let temp = JSON.parse(getStorage("pokemon"))
        this._pokemons.forEach(element => {
            element.name = this.capitalizeFirstLetter(element.name);
            this.http.get(element.url)
            .subscribe((data: any) => {
                element.id = data.id;
                if(temp.includes(element.id)){
                    element.isCaught = true;
                }else {
                    element.isCaught = false;
                }
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

            for (const pokemonId of pokemons) {
                this.http.get<Pokemon[]>(this.DEFAULT_URL + pokemonId)
                    .subscribe((data: any) => {
                        const pokemon: CaughtPokemon = this.getCaughtPokemon(data, pokemonId);
                        this.caughtPokemons.push(pokemon)
                    }, (error: HttpErrorResponse) => {
                        this._error = error.message;
                    });
            }
        }
    }

    getCaughtPokemon(data: any, id: number) {
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