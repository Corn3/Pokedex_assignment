import { Component, Input } from "@angular/core";

@Component({
    selector: "app-caught-pokemon-type",
    templateUrl: "./caught-pokemon-type-item.component.html",
    styleUrls: ["./caught-pokemon-type-item.component.css"]
})
export class CaughtPokemonTypeComponent {
    @Input() type: string | undefined;
    get pokemonType(): string | undefined {
        if(this.type !== undefined)
            return this.type
        else {
            return undefined;
        }
    }
}