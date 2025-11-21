import { Component, inject } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { ProductService } from '../../services/product-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-popular-products',
  imports: [ProductCard],
  templateUrl: './popular-products.html',
})
export class PopularProducts {
  productService = inject(ProductService);
  products = toSignal(this.productService.getFeaturedProducts());
}
