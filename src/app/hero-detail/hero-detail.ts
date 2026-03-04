import { Component, input } from '@angular/core';
import { Hero } from '../hero';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.html',
  styleUrls: ['./hero-detail.scss'],
  standalone: true,
  imports: [FormsModule, UpperCasePipe],
})
export class HeroDetailComponent {
  hero = input<Hero>();
}
