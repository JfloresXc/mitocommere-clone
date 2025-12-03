import { Component, computed, input } from '@angular/core';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product-info-preview',
  imports: [],
  templateUrl: './product-info-preview.html',
  styles: ``,
})
export class ProductInfoPreview {
  product = input<Product>();
  ratingArray = computed(() => {
    return Array.from({ length: this.product()?.rating ?? 0 });
  });
}
