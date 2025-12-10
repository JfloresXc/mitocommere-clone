import { Component } from '@angular/core';
import { Wishlist } from '../components/wishlist/wishlist';
import { Breadcrumb } from '@/modules/ui/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-wishlist-page',
  imports: [Breadcrumb, Wishlist],
  template: `
    <app-breadcrumb></app-breadcrumb>
    <app-wishlist></app-wishlist>
  `,
})
export class WishlistPage {}
