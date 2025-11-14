import { Component, inject } from '@angular/core';
import { SidebarService } from '../../../../shared/services/sidebar';
// import { CategoryService } from '../../../modules/categories/services/category';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styles: ``,
})
export class Sidebar {
  sidebarService = inject(SidebarService);
  // categoryService = inject(CategoryService);

  onClose(): void {
    this.sidebarService.close();
  }

  onOverlayClick(): void {
    this.sidebarService.close();
  }
}
