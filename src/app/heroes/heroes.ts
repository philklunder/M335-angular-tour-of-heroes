import { Component, inject, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from '../hero-detail/hero-detail';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.html',
  styleUrl: './heroes.scss',
  standalone: true,
  imports: [FormsModule, HeroDetailComponent],
})
export class Heroes implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;

  private heroService = inject(HeroService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
}
