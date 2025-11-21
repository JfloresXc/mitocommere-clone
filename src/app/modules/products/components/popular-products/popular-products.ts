import { Component } from '@angular/core';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-popular-products',
  imports: [ProductCard],
  templateUrl: './popular-products.html',
})
export class PopularProducts {}
