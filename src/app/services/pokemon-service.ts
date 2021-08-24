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
            console.log(data.results)
            this._pokemons = data.results;
        }, (error: HttpErrorResponse) => {
            this._error = error.message;
        })
    }
    public pokemons(): Pokemon[] {
        return this._pokemons;
    }
    public error(): string {
        return this._error;
    }
}