import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  private apiUrl = 'http://localhost:3000/api/chat';

  private http = inject(HttpClient);

  constructor() { }

  sendMessage(req: any) {
    return this.http.post<{ response: string }>(this.apiUrl, req);
  }
  
}
