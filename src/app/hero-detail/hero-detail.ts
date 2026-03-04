import { Component, input } from '@angular/core';
import { Hero } from '../hero';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
  standalone: true,
  imports: [FormsModule, UpperCasePipe],
})
export class HeroDetailComponent {
  hero = input.required<Hero>();
}
