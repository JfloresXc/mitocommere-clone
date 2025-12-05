import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductList } from './product-list';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../models/Product';
import { cartReducer } from '@/store/cart/cart.reducer';
import { provideStore } from '@ngrx/store';

const mockProducts: Product[] = [
  {
    name: 'Test Product',
    id: '0',
    price: 100,
    rating: 4.5,
    stock: 10,
    category: 'Test Category',
    image: 'test.jpg',
  },
];
describe('ProductList + ProductCard Integration', () => {
  let fixture: ComponentFixture<ProductList>;
  let component: ProductList;
  let compiledElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductList, ProductCard],
      providers: [
        provideStore({
          cart: cartReducer,
        }),
      ],
    });
    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    compiledElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('debería crear el componente ProductList', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar el componente ProductCard', () => {
    fixture.componentRef.setInput('products', mockProducts);
    fixture.detectChanges();
    const productCardElement = compiledElement.querySelector('app-product-card');
    expect(productCardElement).toBeTruthy();
  });
});
