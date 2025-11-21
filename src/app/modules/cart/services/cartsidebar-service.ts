import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartsidebarService {
  isOpen = signal(false);

  open() {
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }

  toggle() {
    this.isOpen.update((current) => !current);
  }
}
