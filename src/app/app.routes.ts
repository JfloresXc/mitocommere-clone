import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/ui/pages/home-page/home-page').then((mod) => mod.HomePage),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./modules/products/pages/product-list-page/product-list-page').then(
        (mod) => mod.ProductListPage,
      ),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./modules/products/pages/product-detail-page/product-detail-page').then(
        (mod) => mod.ProductDetailPage,
      ),
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/pages/login-page').then((mod) => mod.LoginPage),
  },
];
