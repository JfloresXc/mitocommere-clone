import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../models/Product';
import { Store } from '@ngrx/store';
import { CartActions } from '@/store/cart/cart.actions';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styles: ``,
})
export class ProductCard {
  product = input.required<Product>();
  ratingArray = computed(() => Array.from({ length: Math.round(this.product().rating ?? 0) ?? 0 }));

  store = inject(Store);

  addToCart() {
    this.store.dispatch(CartActions.addToCart({ product: this.product() }));
  }
}
