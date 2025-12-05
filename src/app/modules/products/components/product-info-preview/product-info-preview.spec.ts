import { TestBed } from '@angular/core/testing';
import { ProductInfoPreview } from './product-info-preview';
import { Product } from '../../models/Product';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  price: 100,
  category: 'Test Category',
  rating: 4,
  image: 'test.jpg',
};

describe('ProductInfoPreview', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductInfoPreview],
    });
  });

  it('debería crear el componente', () => {
    const fixture = TestBed.createComponent(ProductInfoPreview);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('debería mostrar la información del producto', () => {
    const fixture = TestBed.createComponent(ProductInfoPreview);
    const component = fixture.componentInstance;
    fixture.componentRef.setInput('product', mockProduct);

    expect(component.product()).toEqual(mockProduct);
    expect(component.product()?.name).toBe('Test Product');
  });
});
