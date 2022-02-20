import { Injectable } from "@angular/core";

import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Message } from "../models/message.interface";
import { WebsocketService } from "./websocket.service";

const CHAT_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    // this.messages = <Subject<Message>>wsService.connect(CHAT_URL)
    //   .pipe(map(
    //     (response: MessageEvent): Message => {
    //       let data = JSON.parse(response.data);
    //       return {
    //         author: data.author,
    //         message: data.message
    //       };
    //     }
    //   ));
  }
}