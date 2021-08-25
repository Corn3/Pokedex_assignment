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
        setStorage("trainer", "Test") // Remove later
        if(getStorage("trainer") === "{}") {
            this.router.navigate(["landing"]);
        }
    }
}