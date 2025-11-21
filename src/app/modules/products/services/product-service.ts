import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  httpClient = inject(HttpClient);

  getFeaturedProducts() {
    return this.httpClient.get<Product[]>(`${environment.apiUrl}/api/products/featured`);
  }
}
