import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Product } from '../models/Product';
import { GetProductDTO } from '../models/GetProductDTO';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  httpClient = inject(HttpClient);

  getFeaturedProducts() {
    return this.httpClient.get<Product[]>(`${environment.apiUrl}/api/products/featured`);
  }

  getProducts(searchTerm: string) {
    const url = searchTerm
      ? `${environment.apiUrl}/api/products?search=${searchTerm}`
      : `${environment.apiUrl}/api/products`;
    return this.httpClient.get<GetProductDTO>(url);
  }
}
