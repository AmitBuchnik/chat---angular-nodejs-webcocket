import { Injectable } from "@angular/core";

import { Observable, Observer, Subject } from "rxjs";
import { io } from "socket.io-client";
import { environment } from "src/environments/environment";
import { Message } from "../models/message.interface";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: any;

  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    // this.socket = io('http://localhost:3000');
  }

  listen(eventname: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventname, (data: Message) => {
        subscriber.next(data);
      })
    })
  }

  emit(eventname: string, data: Message) {
    this.socket.emit(eventname, data);
  }
}