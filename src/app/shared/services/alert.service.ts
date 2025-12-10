import { Injectable, signal } from '@angular/core';

export interface Alert {
  message: string;
  type: 'info' | 'error' | 'success' | 'warning';
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alert = signal<Alert>({
    message: '',
    type: 'info',
  });

  showAlert(alert: Alert) {
    this.alert.set(alert);
    setTimeout(() => {
      this.alert.set({
        message: '',
        type: 'info',
      });
    }, 3000);
  }
}
