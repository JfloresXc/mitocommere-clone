import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  httpClient = inject(HttpClient);

  getCategories() {
    return this.httpClient.get<Category[]>(`${environment.apiUrl}/api/categories`);
  }
}
