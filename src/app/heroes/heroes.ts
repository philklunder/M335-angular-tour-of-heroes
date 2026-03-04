import { Component } from '@angular/core';
import { Hero}   from '../hero';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { HEROES} from '../mock-heroes';
import { HeroDetailComponent } from '../hero-detail/hero-detail';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.html',
  styleUrl: './heroes.scss',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, HeroDetailComponent],
})
export class Heroes {
  heroes = HEROES;
  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
