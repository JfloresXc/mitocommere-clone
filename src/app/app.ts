import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './modules/ui/components/footer/footer';
import { Navbar } from './modules/ui/components/navbar/navbar';
import { Sidebar } from './modules/ui/components/sidebar/sidebar';
import { ShoppingCartSidebar } from './modules/cart/components/shopping-cart-sidebar/shopping-cart-sidebar';
import { Store } from '@ngrx/store';
import { CartLocalStorageActions } from './store/cart/cart.actions';
import { Alert } from './modules/ui/components/alert/alert';
import { ChatBot } from './modules/ui/components/chat-bot/chat-bot';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar, Sidebar, ShoppingCartSidebar, Alert, ChatBot],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  store = inject(Store);
  constructor() {
    afterNextRender(() => {
      this.store.dispatch(CartLocalStorageActions.loadCartFromLocalStorage());
    });
  }
}
