import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';
import { HeroItemComponent } from './hero-item/hero-item';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.html',
  styleUrl: './heroes.scss',
  standalone: true,
  imports: [HeroItemComponent, AsyncPipe],
})
export class Heroes implements OnInit {
  heroes$!: Observable<Hero[]>;

  private heroService = inject(HeroService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroes$ = this.heroService.getHeroes();
  }

  onHeroSelected(id: number): void {
    this.router.navigate(['/detail', id]);
  }
}
