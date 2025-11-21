import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

interface Slide {
  id: number;
  image: string;
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styles: `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in {
      animation: fadeIn 0.6s ease-out;
    }
  `,
})
export class Hero implements OnInit, OnDestroy {
  currentSlide = signal(0);

  private intervalId: ReturnType<typeof setInterval> | null = null;

  slides: Slide[] = [
    {
      id: 0,
      image: '/img/banner/banner-1.jpg',
      subtitle: 'Verduras Orgánicas',
      title: 'La mejor manera de cuidar tu salud.',
      description:
        'Descubre nuestra selección de vegetales frescos y orgánicos. Calidad garantizada directamente del campo a tu mesa.',
      buttonText: 'Comprar Ahora',
      buttonLink: 'shop-left-sidebar.html',
    },
    {
      id: 1,
      image: '/img/banner/banner-2.jpg',
      subtitle: 'Frutas Orgánicas',
      title: 'Explora frutas frescas y jugosas.',
      description:
        'Las mejores frutas de temporada seleccionadas especialmente para ti. Sabor natural y auténtico en cada bocado.',
      buttonText: 'Comprar Ahora',
      buttonLink: 'shop-left-sidebar.html',
    },
  ];

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  startAutoplay(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 10000);
  }

  stopAutoplay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide(): void {
    this.currentSlide.update((current) => (current === this.slides.length - 1 ? 0 : current + 1));
  }

  previousSlide(): void {
    this.currentSlide.update((current) => (current === 0 ? this.slides.length - 1 : current - 1));
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
    this.stopAutoplay();
    this.startAutoplay();
  }
}
