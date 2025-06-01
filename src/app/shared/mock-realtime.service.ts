import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MockRealtimeService {
  private data$ = new BehaviorSubject<string[]>([]);

  constructor() {
    // Her 5 saniyede bir yeni veri eklensin
    interval(5000).subscribe(() => {
      const now = new Date().toLocaleTimeString();
      this.addMessage(`Mock WebSocket'ten yeni mesaj: ${now}`);
    });
  }

  addMessage(msg: string) {
    const current = this.data$.value;
    this.data$.next([...current, msg]);
  }

  get messages$() {
    return this.data$.asObservable();
  }
}
