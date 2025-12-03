import { Component, input, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ProductImage } from '../../models/ProductImage';

@Component({
  selector: 'app-product-image-preview',
  imports: [NgOptimizedImage],
  templateUrl: './product-image-preview.html',
  styles: ``,
})
export class ProductImagePreview {
  productImages = input<ProductImage[]>([]);
  selectedImageIndex = signal(0);
  featuredImageUrl = signal('');

  selectImage(index: number) {
    this.selectedImageIndex.set(index);
  }

  getImageUrl(image: string) {
    return `https://maraviyainfotech.com/projects/carrot-tailwind/assets${image}`;
  }
}
