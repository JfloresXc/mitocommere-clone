import { Component, inject, signal } from '@angular/core';
import { ProductCard } from '@/modules/products/components/product-card/product-card';
import { Product } from '@/modules/products/models/Product';
import { WishlistService } from '../../services/wishlist.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-wishlist',
  imports: [ProductCard],
  templateUrl: './wishlist.html',
  styles: ``,
})
export class Wishlist {
  wishlistService = inject(WishlistService);
  wishlist = signal<Product[]>([]);

  productsDefault: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      price: 100,
      category: 'Category 1',
      image: 'img/product/16.jpg',
    },
  ];

  wishListResource = rxResource({
    stream: () => this.wishlistService.getWishlist(),
    defaultValue: [],
  });
}
