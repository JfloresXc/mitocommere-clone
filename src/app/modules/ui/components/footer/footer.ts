import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [FormsModule],
  templateUrl: './footer.html',
  styles: ``,
})
export class Footer {
  currentYear = signal(new Date().getFullYear());

  companyLinks = [
    { title: 'Sobre Nosotros', url: '/about' },
    { title: 'Información de Envío', url: '/track-order' },
    { title: 'Política de Privacidad', url: '/policy' },
    { title: 'Términos y Condiciones', url: '/terms' },
    { title: 'Contáctanos', url: '/contact' },
    { title: 'Centro de Soporte', url: '/faq' },
  ];

  categoryLinks = [
    { title: 'Lácteos y Panadería', url: '/shop/dairy-bakery' },
    { title: 'Frutas y Verduras', url: '/shop/fruits-vegetable' },
    { title: 'Snacks y Especias', url: '/shop/snack-spice' },
    { title: 'Jugos y Bebidas', url: '/shop/juice-drinks' },
    { title: 'Pollo y Carne', url: '/shop/chicken-meat' },
    { title: 'Comida Rápida', url: '/shop/fast-food' },
  ];

  socialMedia = [
    { icon: 'ri-facebook-line', url: 'https://facebook.com' },
    { icon: 'ri-twitter-x-line', url: 'https://twitter.com' },
    { icon: 'ri-dribbble-line', url: 'https://dribbble.com' },
    { icon: 'ri-instagram-line', url: 'https://instagram.com' },
  ];

  newsletterEmail = signal('');

  onNewsletterSubmit(): void {
    if (this.newsletterEmail()) {
      this.newsletterEmail.set('');
    }
  }
}
