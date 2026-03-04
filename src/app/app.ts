import { Component } from '@angular/core';
import { Heroes } from './heroes/heroes';
import { MessagesComponent } from './messages/messages';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Heroes, MessagesComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = 'Tour of Heroes';
}
