import { Component, inject } from '@angular/core';
import { CartsidebarService } from '../../services/cartsidebar-service';
import { Store } from '@ngrx/store';
import { selectCartProducts, selectCartTotal } from '@/store/cart/cart.selectors';
import { CartActions } from '@/store/cart/cart.actions';
import { Product } from '@/modules/products/models/Product';

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

  clearCart() {
    this.store.dispatch(CartActions.clearCart());
  }

  addQuantity({ product }: { product: Product }) {
    this.store.dispatch(
      CartActions.updateQuantity({ idProduct: product.id, quantity: (product?.quantity ?? 0) + 1 }),
    );
  }

  restQuantity({ product }: { product: Product }) {
    this.store.dispatch(
      CartActions.updateQuantity({ idProduct: product.id, quantity: (product?.quantity ?? 0) - 1 }),
    );
  }
}
