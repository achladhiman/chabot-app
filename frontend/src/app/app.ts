import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatService } from './chat-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
  messages:any[]=[];
  userInput:string='';
  sessionId:string= Math.random().toString(36).substring(2, 15);
  isLoading:boolean=false;

  private chatService=inject(ChatService)
  private cd = inject(ChangeDetectorRef);


  //sending the user message to backend and getting the response using chatService
  sendMessage() {
    // Prevent sending empty messages
    if (this.userInput.trim() === '') {
      return;
    }
    // Add the user's message to the chat history
    this.messages.push({ text: this.userInput, role: 'user' });

    this.isLoading = true; // Set loading to true when sending a message

    //calling sendMessage function of chatService to send the message to backend and get the response
    this.chatService.sendMessage({ sessionId: this.sessionId, message: this.userInput }).subscribe(
      (response) => {
        console.log(response);
        this.messages.push({ text: response.response, role: 'assistant' });
        this.userInput = '';
        this.isLoading = false; // Set loading to false after receiving a response
        this.cd.markForCheck();
      },
      (error) => {
        console.error('Error sending message:', error);
        this.isLoading = false; // Set loading to false in case of an error
      }
    );
  }
}
