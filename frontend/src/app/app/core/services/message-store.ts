import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageDto } from '../models/message';
import { MessageHub } from './message-hub';
import { MessageService } from './api/message.service';

@Injectable({ providedIn: 'root' })
export class MessageStoreService {
  private messagesSubject = new BehaviorSubject<MessageDto[]>([]);
  messages$ = this.messagesSubject.asObservable();

  private unreadCountSubject = new BehaviorSubject<number>(0);
  unreadCount$ = this.unreadCountSubject.asObservable();

  constructor(private hub: MessageHub, private api: MessageService) {
    this.hub.messageReceived.subscribe(m => this.prepend(m));
  }

  loadInitial() {
    // backend returns conversation summaries for the current user; map them to MessageDto-like objects
    this.api.getForCurrentUser().subscribe((res: any) => {
      const convs = Array.isArray(res.result) ? res.result : [];
      const list: MessageDto[] = convs.map((c: any, idx: number) => ({
        id: 0, // no specific message id returned in conversations summary
        senderId: c.otherUserName ?? c.otherUserId?.toString() ?? `user-${idx}`,
        receiverId: '',
        content: c.lastMessage ?? '',
        sentAt: c.lastSentAt ?? '',
        isRead: (c.unreadCount ?? 0) === 0
      }));

      this.messagesSubject.next(list);
      this.unreadCountSubject.next(convs.reduce((acc: number, c: any) => acc + (c.unreadCount ?? 0), 0));
    }, err => console.error(err));
  }

  markAsRead(id: number) {
    const msgs = this.messagesSubject.value.slice();
    let changed = false;
    for (let i = 0; i < msgs.length; i++) {
      if (msgs[i].id === id && !msgs[i].isRead) {
        msgs[i] = { ...msgs[i], isRead: true } as MessageDto;
        changed = true;
        break;
      }
    }
    if (changed) {
      this.messagesSubject.next(msgs);
      const newCount = Math.max(0, this.unreadCountSubject.value - 1);
      this.unreadCountSubject.next(newCount);
    }
  }

  private prepend(m: MessageDto) {
    const current = this.messagesSubject.value;
    this.messagesSubject.next([m, ...current]);
    this.unreadCountSubject.next(this.unreadCountSubject.value + (m.isRead ? 0 : 1));
  }
}
