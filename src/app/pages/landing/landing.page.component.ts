import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { getStorage, setStorage } from 'src/app/storage/storage';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-landing.page',
  templateUrl: './landing.page.component.html',
  styleUrls: ['./landing.page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private readonly pokemonService: PokemonService,
    private router: Router) { 
  }

  ngOnInit(): void {
    if(this.pokemonService.isLoggedIn()) {
      this.router.navigate(["catalogue"]);
    }
  }

  public onSubmit(form: NgForm) {
    setStorage('trainer', form.value.username);
    this.router.navigate(["catalogue"])
  }

}
