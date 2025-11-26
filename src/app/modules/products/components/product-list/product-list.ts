import { Component, input } from '@angular/core';
import { PriceFilter } from '../product-filters/product-filters';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styles: ``,
})
export class ProductList {
  priceFilter = input<PriceFilter | null>(null);
}
