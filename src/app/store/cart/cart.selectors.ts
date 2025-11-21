import { Product } from '@/modules/products/models/Product';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCartState = createFeatureSelector<readonly Product[]>('cart');

export const selectCartProducts = createSelector(selectCartState, (state) => state);

export const selectCartTotal = createSelector(selectCartState, (state) =>
  state.reduce((total, product) => total + (product?.price ?? 0), 0),
);
