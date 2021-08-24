import { Component, OnInit } from "@angular/core";
import { getStorage, setStorage } from "src/app/storage/storage";
import { PokemonService } from "../../services/pokemon.service";

@Component({
    selector: "app-trainer-page",
    templateUrl: "./trainer-page.component.html",
    styleUrls: ["./trainer-page.component.css"]
})
export class TrainerPageComponent implements OnInit {

    constructor(private readonly pokemonSerive: PokemonService){}

    ngOnInit() {
        console.log(getStorage("trainer"));
        if(getStorage("trainer") === "{}") {
            //Should redirect here to landing page instead of code below.
            setStorage("trainer", "Robin");
            const pokemons: string[] = ["bulbasaur", "charmander", "pikachu"];
            setStorage("caught-pokemons", JSON.stringify(pokemons));
        } else {
            const pokemons: string[] = JSON.parse(getStorage("caught-pokemons"))
            console.log(pokemons)
            this.pokemonSerive.fetchCaughtPokemons(pokemons)
        }
    }
}