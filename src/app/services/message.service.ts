import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageSubject = new Subject<string>();

  getMessage(): Observable<string> {
    return this.messageSubject.asObservable();
  }

  sendMessage(message: string): void {
    this.messageSubject.next(message);
  }

  clearMessages(): void {
    this.messageSubject.next('');
  }
}
