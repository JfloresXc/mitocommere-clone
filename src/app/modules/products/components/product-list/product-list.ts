import { Component, input } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styles: ``,
})
export class ProductList {
  products = input<Product[]>([]);
}
