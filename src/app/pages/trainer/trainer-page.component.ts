import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-trainer-page",
    templateUrl: "./trainer-page.component.html",
    styleUrls: ["./trainer-page.component.css"]
})
export class TrainerPageComponent implements OnInit {
    ngOnInit() {
        console.log("Component has been initialized");
    }
}