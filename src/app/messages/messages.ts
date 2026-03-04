import { Component, inject } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.html',
  styleUrls: ['./messages.scss'],
  standalone: true,
})
export class MessagesComponent {
  public messageService = inject(MessageService);
}
