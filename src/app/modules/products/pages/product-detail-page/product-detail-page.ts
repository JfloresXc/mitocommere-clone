import { Component } from '@angular/core';
import { ProductImagePreview } from '../../components/product-image-preview/product-image-preview';
import { ProductInfoPreview } from '../../components/product-info-preview/product-info-preview';

@Component({
  selector: 'app-product-detail-page',
  imports: [ProductImagePreview, ProductInfoPreview],
  templateUrl: './product-detail-page.html',
  styles: ``,
})
export class ProductDetailPage {}
