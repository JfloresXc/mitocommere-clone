import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { PopularProducts } from '@/modules/products/components/popular-products/popular-products';

@Component({
  selector: 'app-home-page',
  imports: [Hero, PopularProducts],
  template: `
    <app-hero></app-hero>
    <app-popular-products></app-popular-products>
  `,
  styles: ``,
})
export class HomePage {}
