import { Component, inject } from '@angular/core';
import { SidebarService } from '../../../../shared/services/sidebar';
import { CategoryStateService } from '@/modules/categories/services/category-state-service';
import { CartsidebarService } from '@/modules/cart/services/cartsidebar-service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
})
export class Navbar {
  private sidebarService = inject(SidebarService);
  isProductsOpen = false;
  categoryStateService = inject(CategoryStateService);
  cartsidebarService = inject(CartsidebarService);

  toggleProductsMenu(): void {
    this.isProductsOpen = !this.isProductsOpen;
  }

  onMenuToggle(): void {
    this.sidebarService.toggle();
  }
}
