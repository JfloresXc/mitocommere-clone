import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './modules/ui/components/footer/footer';
import { Hero } from './modules/ui/components/hero/hero';
import { Navbar } from './modules/ui/components/navbar/navbar';
import { Sidebar } from './modules/ui/components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Hero, Navbar, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
