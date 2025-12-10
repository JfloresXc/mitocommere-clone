import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../models/Product';
import { Store } from '@ngrx/store';
import { CartActions } from '@/store/cart/cart.actions';
import { NgOptimizedImage } from '@angular/common';
import { WishlistService } from '@/modules/wishlist/services/wishlist.service';
import { AlertService } from '@/shared/services/alert.service';
import { Router } from '@angular/router';

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
  alertService = inject(AlertService);

  store = inject(Store);
  wishListService = inject(WishlistService);
  router = inject(Router);

  addToCart() {
    this.store.dispatch(
      CartActions.addToCart({
        product: this.product(),
      }),
    );
  }

  addToWishList() {
    this.wishListService.addToWishlist(this.product().id).subscribe({
      next: () => {
        this.alertService.showAlert({
          message: 'Producto agregado a la lista de deseos',
          type: 'success',
        });
      },
      error: (error) => {
        const unauthorizedStatusCode = 401;
        if (error?.error?.statusCode == unauthorizedStatusCode) {
          this.alertService.showAlert({
            message: 'Debe estar autenticado para agregar productos a la lista de deseos',
            type: 'error',
          });
          this.router.navigate(['/login']);
        }
      },
    });
  }
}
