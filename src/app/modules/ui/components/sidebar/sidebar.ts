import { Component, inject } from '@angular/core';
import { SidebarService } from '../../../../shared/services/sidebar';
import { CategoryStateService } from '@/modules/categories/services/category-state-service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styles: ``,
})
export class Sidebar {
  sidebarService = inject(SidebarService);
  categoryStateService = inject(CategoryStateService);

  onClose(): void {
    this.sidebarService.close();
  }

  onOverlayClick(): void {
    this.sidebarService.close();
  }
}
