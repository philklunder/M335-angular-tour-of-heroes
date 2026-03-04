import { Component, input, output } from '@angular/core';
import { Hero } from '../../hero';

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.html',
  styleUrl: './hero-item.scss',
  standalone: true,
})
export class HeroItemComponent {
  hero = input.required<Hero>();
  heroSelected = output<number>();

  onClick(): void {
    this.heroSelected.emit(this.hero().id);
  }
}
