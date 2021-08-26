import { Component, OnInit } from "@angular/core";
import { CaughtPokemon } from "src/app/models/caughtPokemon.model";
import { getStorage, setStorage } from "src/app/storage/storage";

@Component({
    selector: "app-pokemon-party",
    templateUrl: "./party-pokemon-selected.component.html",
    styleUrls: ["./party-pokemon-selected.component.css"]
})
export class PartyPokemonSelectedComponent implements OnInit {

    private pokeball: CaughtPokemon = { name: "pokeball", id: 0, types: [], animatedAvatar: "../../../assets/pokeball-sprites/pokeball.png" };
    private caughtPokemons: CaughtPokemon[] = [
        this.pokeball,
        this.pokeball,
        this.pokeball,
        this.pokeball,
        this.pokeball,
        this.pokeball
    ];

    ngOnInit() {
        let partyPokemon = JSON.parse(getStorage("party"));
        if (partyPokemon.length === undefined) {
            partyPokemon = this.caughtPokemons;
        } else {
            for (let i = 0; i < 6; i++) {
                if (partyPokemon[i] === undefined) {
                    partyPokemon[i] = this.pokeball;
                }
            }
        }
        setStorage("party", JSON.stringify(partyPokemon));
    }

    get pokemons(): CaughtPokemon[] {
        return JSON.parse(getStorage("party"));
    }

    public handlePartyPokemonClicked(pokemon: CaughtPokemon) {
        let partyPokemons: CaughtPokemon[] = JSON.parse(getStorage("party"));
        if (pokemon.id === 0) {
            return;
        }
        for (let i = 0; i < partyPokemons.length; i++) {
            if (partyPokemons[i].id === pokemon.id) {
                partyPokemons.splice(i, 1);
                partyPokemons.push(this.pokeball);
                setStorage("party", JSON.stringify(partyPokemons));
            }
        }
    }

}