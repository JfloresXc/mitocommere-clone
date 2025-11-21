import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './modules/ui/components/footer/footer';
import { Hero } from './modules/ui/components/hero/hero';
import { Navbar } from './modules/ui/components/navbar/navbar';
import { Sidebar } from './modules/ui/components/sidebar/sidebar';
import { PopularProducts } from './modules/products/components/popular-products/popular-products';
import { ShoppingCartSidebar } from './modules/cart/components/shopping-cart-sidebar/shopping-cart-sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Hero, Navbar, Sidebar, PopularProducts, ShoppingCartSidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
