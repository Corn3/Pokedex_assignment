import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Pokemon } from "./models/pokemon.model";

@Injectable({
    providedIn: 'root'
})
export class PokemonService {

    private _pokemons: Pokemon[] = [];
    private _error: string = "";

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
     */
    public fetchPokemonStats(): void {
        this._pokemons.forEach(element => {
            element.name = element.name.charAt(0).toUpperCase() + element.name.slice(1);
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
    public pokemons(): Pokemon[] {
        return this._pokemons;
    }
    public error(): string {
        return this._error;
    }
}