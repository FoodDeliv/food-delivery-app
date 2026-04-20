import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSource = new Subject<{message: string, type: string}>();
  notification$ = this.notificationSource.asObservable();

  show(message: string, type: 'error' | 'success' | 'info' = 'info') {
    this.notificationSource.next({ message, type });
  }
}