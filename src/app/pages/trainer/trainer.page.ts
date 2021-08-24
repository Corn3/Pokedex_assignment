import { Component, OnInit } from "@angular/core";
import { getStorage, setStorage } from "src/app/storage/storage";
import { Router } from "@angular/router";

@Component({
    selector: "app-trainer-page",
    templateUrl: "./trainer.page.html",
    styleUrls: ["./trainer.page.css"]
})
export class TrainerPage implements OnInit {

    constructor(private router: Router) {}

    ngOnInit() {
        /** Should be removed ones other pages are done */
        setStorage("trainer", "Robin");
        let pokemons: string[] = ["bulbasaur", "charmander", "pikachu"];
        setStorage("caught-pokemons", JSON.stringify(pokemons));
        /** to here */
        if(getStorage("trainer") === "{}") {
            this.router.navigate(["landing"]);
        }
    }
}