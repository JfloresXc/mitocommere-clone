import { Component, computed, inject } from '@angular/core';
import { ProductFilters } from '../../components/product-filters/product-filters';
import { ProductList } from '../../components/product-list/product-list';
import { ProductService } from '../../services/product-service';
import { ActivatedRoute } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GetProductDTO } from '../../models/GetProductDTO';

const DEFAULT_DATA: GetProductDTO = {
  data: [],
};
@Component({
  selector: 'app-product-list-page',
  imports: [ProductFilters, ProductList],
  template: `
    <section class="section-shop py-[100px] max-[1200px]:py-[50px]">
      <div
        class="flex flex-wrap justify-between relative items-center mx-auto min-[1600px]:max-w-[1500px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]"
      >
        <div class="w-full flex mb-[-30px]">
          <div class="w-1/3">
            <app-product-filters></app-product-filters>
          </div>
          <div class="w-2/3">
            <app-product-list [products]="products()"></app-product-list>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: ``,
})
export class ProductListPage {
  productService = inject(ProductService);
  activatedRoute = inject(ActivatedRoute);
  searchTerm = toSignal(
    this.activatedRoute.queryParamMap.pipe(map((params) => params.get('search') || '')),
  );
  category = toSignal(
    this.activatedRoute.queryParamMap.pipe(map((params) => params.get('category') || '')),
  );

  productsResource = rxResource({
    params: () => ({
      searchTerm: this.searchTerm(),
      category: this.category(),
    }),
    stream: ({ params: { searchTerm, category } }) =>
      this.productService.getProducts({ searchTerm: searchTerm ?? '', category: category ?? '' }),
    defaultValue: DEFAULT_DATA,
  });
  products = computed(() => this.productsResource.value()?.data || []);
}
