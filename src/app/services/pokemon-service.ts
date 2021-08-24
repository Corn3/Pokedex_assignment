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
    public fetchPokemons(): void {
        this.http.get('https://pokeapi.co/api/v2/pokemon/?limit=151')
        .subscribe((data: any) => {
            this._pokemons = data.results;
            this.fetchPokemonStats();
        }, (error: HttpErrorResponse) => {
            this._error = error.message;
        })
    }
    public fetchPokemonStats(): void {
        this._pokemons.forEach(element => {
            element.name = element.name.charAt(0).toUpperCase() + element.name.slice(1);
            element.isCaught = false;
            this.http.get(element.url)
                .subscribe((data: any) => {
                element.id = data.id;
            }, (error: HttpErrorResponse) => {
                this._error = error.message;
            })           
        });
    }
    public pokemons(): Pokemon[] {
        return this._pokemons;
    }
    public error(): string {
        return this._error;
    }
}