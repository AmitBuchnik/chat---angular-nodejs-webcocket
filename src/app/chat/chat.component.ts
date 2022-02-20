import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Message } from '../models/message.interface';
import { ChatService } from '../services/chat.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  reactiveForm: FormGroup;
  messages = [] as string[];
  messageSubscription: Subscription;

  constructor(private chatService: ChatService,
    private websocketService: WebsocketService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.listenToMessages();
  }

  initForm() {
    let controlConfig = this.getControlConfig();
    this.reactiveForm = this.fb.group(controlConfig, {
      validators: []
    });
  }

  getControlConfig(): any {
    let config = {
      message: ['', [] as any[]],
      name: ['', [] as any[]],
    };
    return config;
  }

  listenToMessages() {
    this.messageSubscription =
      this.websocketService.listen('chat')
        .subscribe((data) => this.updateMessage(data));
  }

  updateMessage(msg: Message) {
    this.messages = [...this.messages, `${msg.author}: ${msg.message}`];
  }

  sendMessage() {
    const message = this.reactiveForm.value.message;
    if (message) {
      console.log("new message from client to websocket: ", message);

      this.websocketService.emit('chat', {
        author: this.reactiveForm.value.name,
        message: message
      });

      this.reactiveForm.patchValue({
        message: ''
      })
    }
  }

  ngOnDestroy(): void {
    this.messageSubscription?.unsubscribe();
  }
}
