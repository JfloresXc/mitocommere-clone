import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Category } from '../models/Category';
import { CategoryService } from './category-service';

@Injectable({
  providedIn: 'root',
})
export class CategoryStateService {
  categoryService = inject(CategoryService);
  categories = toSignal<Category[]>(this.categoryService.getFeaturedCategories());
}
