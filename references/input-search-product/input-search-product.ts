import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ProductService,
  type Product,
} from '../../../modules/products/services/product';

@Component({
  selector: 'app-input-search-product',
  imports: [FormsModule],
  templateUrl: './input-search-product.html',
})
export class InputSearchProduct {
  private productService = inject(ProductService);

  searchQuery = signal('');
  selectedCategory = signal('all');
  showSuggestions = signal(false);

  // Filtrar productos basados en la búsqueda y categoría usando el servicio
  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();

    if (!query) {
      return [];
    }

    // Usar el método del servicio para búsqueda y filtrado
    const products = this.productService.searchAndFilter(query, category);

    // Máximo 5 sugerencias
    return products.slice(0, 5);
  });

  onSearchInput(value: string): void {
    this.searchQuery.set(value);
    this.showSuggestions.set(value.trim().length > 0);
  }

  onCategoryChange(value: string): void {
    this.selectedCategory.set(value);
  }

  onSelectProduct(product: Product): void {
    console.log('Producto seleccionado:', product);
    this.searchQuery.set(product.name);
    this.showSuggestions.set(false);
    // TODO: Navegar a la página del producto o agregarlo al carrito
  }

  onCloseSuggestions(): void {
    // Pequeño delay para permitir el click en una sugerencia
    setTimeout(() => {
      this.showSuggestions.set(false);
    }, 200);
  }

  onSearch(event: Event): void {
    event.preventDefault();
    const query = this.searchQuery();
    if (query.trim()) {
      this.showSuggestions.set(false);
    }
  }
}
