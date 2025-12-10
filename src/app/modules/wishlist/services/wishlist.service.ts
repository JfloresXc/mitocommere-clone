import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Wishlist as WishlistModel } from '../models/Wishlist';
import { Product } from '@/modules/products/models/Product';
import { environment } from '@envs/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  httpClient = inject(HttpClient);
  getWishlist() {
    return this.httpClient.get<Product[]>(`${environment.apiUrl}/api/wishlist`);
  }

  addToWishlist(productId: string) {
    return this.httpClient.post<WishlistModel>(`${environment.apiUrl}/api/wishlist`, { productId });
  }

  removeFromWishlist(wishlist: WishlistModel) {
    return this.httpClient.delete<WishlistModel>(
      `${environment.apiUrl}/api/wishlist/${wishlist.productId}`,
    );
  }
}
