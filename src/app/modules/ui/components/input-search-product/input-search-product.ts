import { GetProductDTO } from '@/modules/products/models/GetProductDTO';
import { ProductService } from '@/modules/products/services/product-service';
import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { debounceTime, of, switchMap } from 'rxjs';

const DEFAULT_DATA: GetProductDTO = {
  data: [],
  meta: {
    total: 0,
    page: 0,
    limit: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};
@Component({
  selector: 'app-input-search-product',
  imports: [FormsModule, RouterLink],
  templateUrl: './input-search-product.html',
})
export class InputSearchProduct {
  searchTerm = signal('');
  productService = inject(ProductService);
  router = inject(Router);

  productData = toSignal(
    toObservable(this.searchTerm).pipe(
      debounceTime(300),
      switchMap((searchTerm) => {
        if (!searchTerm) return of(DEFAULT_DATA);
        return this.productService.getProducts(searchTerm);
      }),
    ),
    {
      initialValue: DEFAULT_DATA,
    },
  );
  products = computed(() => this.productData()?.data || []);

  searchProducts() {
    if (this.searchTerm()) {
      this.router.navigate(['/products'], {
        queryParams: {
          search: this.searchTerm(),
        },
      });
    }
  }
}
