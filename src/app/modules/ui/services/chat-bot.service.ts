import { inject, Injectable } from '@angular/core';
import { ChatMessage } from '../models/ChatMessage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatBotService {
  httpClient = inject(HttpClient);

  sendMessage(message: string) {
    return this.httpClient.post<ChatMessage>(`/api/chat-bot`, { message });
  }
}
