import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../models/Product';
import { Store } from '@ngrx/store';
import { CartActions } from '@/store/cart/cart.actions';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [NgOptimizedImage],
  templateUrl: './product-card.html',
  styles: ``,
})
export class ProductCard {
  product = input<Product>({
    name: '',
    id: '0',
    price: 0,
    rating: 0,
    stock: 0,
    category: '',
    image: '',
  });
  ratingArray = computed(() => Array.from({ length: Math.round(this.product().rating ?? 0) ?? 0 }));

  store = inject(Store);

  addToCart() {
    this.store.dispatch(
      CartActions.addToCart({
        product: this.product(),
      }),
    );
  }
}
