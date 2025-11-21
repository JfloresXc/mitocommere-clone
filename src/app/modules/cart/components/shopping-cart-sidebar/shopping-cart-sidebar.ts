import { Component, inject } from '@angular/core';
import { CartsidebarService } from '../../services/cartsidebar-service';
import { Store } from '@ngrx/store';
import { selectCartProducts, selectCartTotal } from '@/store/cart/cart.selectors';

@Component({
  selector: 'app-shopping-cart-sidebar',
  imports: [],
  templateUrl: './shopping-cart-sidebar.html',
  styles: ``,
})
export class ShoppingCartSidebar {
  store = inject(Store);
  cartsidebarService = inject(CartsidebarService);
  totalProducts = this.store.selectSignal(selectCartTotal);
  productsInCart = this.store.selectSignal(selectCartProducts);
}
