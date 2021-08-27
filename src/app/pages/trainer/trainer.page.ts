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

    private type: string = "caughtList";
    private trainerName: string = "";

    ngOnInit() {
        setStorage("trainer", "Test") // Remove later
        this.trainerName = getStorage("trainer");
        if(this.trainerName === "{}") {
            this.router.navigate(["landing"]);
        }
    }

    public get selectedType() {
        return this.type;
    }

    public set selectedType(value: string) {
        this.type = value;
    }

    public get name() {
        return this.trainerName;
    }
}