import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MessagesComponent } from './messages/messages';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MessagesComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = 'Tour of Heroes';
}
