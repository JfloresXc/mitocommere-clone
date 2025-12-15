import { CategoryStateService } from '@/modules/categories/services/category-state-service';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [FormsModule, RouterLink],
  templateUrl: './footer.html',
  styles: ``,
})
export class Footer {
  currentYear = signal(new Date().getFullYear());
  categoryStateService = inject(CategoryStateService);

  companyLinks = [
    { title: 'Sobre Nosotros', url: '/about' },
    { title: 'Información de Envío', url: '/track-order' },
    { title: 'Política de Privacidad', url: '/policy' },
    { title: 'Términos y Condiciones', url: '/terms' },
    { title: 'Contáctanos', url: '/contact' },
    { title: 'Centro de Soporte', url: '/faq' },
  ];

  decodeURI = decodeURI;
  categoryLinks = computed(
    () =>
      this.categoryStateService.categories()?.map((category) => ({
        title: category.name,
        url: `/products?category=${category.name}`,
      })) ?? [],
  );

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
