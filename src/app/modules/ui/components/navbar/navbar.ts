import { Component, inject } from '@angular/core';
// import { InputSearchProduct } from '../input-search-product/input-search-product';
import { SidebarService } from '../../../../shared/services/sidebar';
// import { CategoryService } from '../../../modules/categories/services/category';
// import { ProductService } from '../../../modules/products/services/product';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
})
export class Navbar {
  private sidebarService = inject(SidebarService);
  // categoryService = inject(CategoryService);
  // productService = inject(ProductService);
  isProductsOpen = false;

  toggleProductsMenu(): void {
    this.isProductsOpen = !this.isProductsOpen;
  }

  onMenuToggle(): void {
    this.sidebarService.toggle();
  }
}
