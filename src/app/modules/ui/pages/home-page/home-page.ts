import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { PopularProducts } from '@/modules/products/components/popular-products/popular-products';
import { PopularProductsSkeleton } from '@/modules/products/components/popular-products-skeleton/popular-products-skeleton';

@Component({
  selector: 'app-home-page',
  imports: [Hero, PopularProducts, PopularProductsSkeleton],
  template: `
    <app-hero></app-hero>
    @defer (on viewport) {
      <app-popular-products></app-popular-products>
    } @placeholder {
      <app-popular-products-skeleton></app-popular-products-skeleton>
    }
  `,
  styles: ``,
})
export class HomePage {}
