import { Injectable } from '@angular/core';
import { MessagesChannelsEnum, MessagesTypeEnum } from '../constants/message-bus.enum';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MessageBusService {

  private channelSubjects: ChannelMessage[] = [];

  constructor() {
  }

  private getChannelType(channel: MessagesChannelsEnum, type: MessagesTypeEnum) {
    let existingChannelSubject = this.channelSubjects.find(x => x.channel === channel && x.type === type);

    if (existingChannelSubject == null) {
        existingChannelSubject = { channel, type, subject: new Subject<any>() };
        this.channelSubjects.push(existingChannelSubject);
    }

    return existingChannelSubject;
  }
  listen<T>(channel: MessagesChannelsEnum, type: MessagesTypeEnum): Observable<T> {
    return this.getChannelType(channel, type).subject.pipe(map(m => m.data));
  }

  publish<T>(channel: MessagesChannelsEnum, type: MessagesTypeEnum, payload: T): void {
    this.getChannelType(channel, type).subject.next({channel, type, data: payload});
  }
}

export interface ChannelMessage {
    channel: MessagesChannelsEnum;
    type: MessagesTypeEnum;
    subject?: Subject<any>;
    data?: any;
}
