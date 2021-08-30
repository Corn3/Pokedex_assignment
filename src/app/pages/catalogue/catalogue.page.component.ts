import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStorage } from 'src/app/storage/storage';

@Component({
  selector: 'app-catalogue.page',
  templateUrl: './catalogue.page.component.html',
  styleUrls: ['./catalogue.page.component.css']
})
export class CataloguePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    const trainerName:string = getStorage("trainer");
    if(trainerName === "{}") {
        this.router.navigate(["landing"]);
    }
}

}
