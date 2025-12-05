import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from './product-service';
import { provideHttpClient } from '@angular/common/http';
import { GetProductDTO } from '../models/GetProductDTO';
import { firstValueFrom } from 'rxjs';
import { environment } from '@envs/environment.development';

const mockProductData: GetProductDTO = {
  data: [
    {
      id: '2',
      name: 'Test Product',
      price: 100,
      category: 'Test Category',
      rating: 4,
      image: 'test.jpg',
    },
  ],
  meta: {
    total: 1,
    limit: 10,
    page: 1,
  },
};

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('debería crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    it('debería obtener una lista de productos sin enviar query params', async () => {
      const request$ = service.getProducts('');
      const response = firstValueFrom(request$);

      const req = httpMock.expectOne(`${environment.apiUrl}/api/products`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProductData);

      const products = (await response).data;
      expect(products).toBeDefined();
    });

    it('debería obtener una lista de productos con query params', async () => {
      const request$ = service.getProducts('jugos');
      const response = firstValueFrom(request$);

      const req = httpMock.expectOne(`${environment.apiUrl}/api/products?search=jugos`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProductData);

      const products = (await response).data;
      expect(products).toBeDefined();
    });
  });
});
