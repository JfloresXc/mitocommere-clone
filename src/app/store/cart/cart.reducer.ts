import { Product } from '@/modules/products/models/Product';
import { createReducer, on } from '@ngrx/store';
import { CartActions } from './cart.actions';

export const initialCartState: readonly Product[] = [];

export const cartReducer = createReducer(
  initialCartState,
  on(CartActions.addToCart, (state, { product }) => {
    // if (state.some((item) => item.id === product.id)) {
    //   product.quantity = (product.quantity ?? 0) + 1;
    //   return [...state];
    // }
    return [...state, product];
  }),
  on(CartActions.deleteFromCart, (state, { product }) => {
    return state.filter((item) => item.id !== product.id);
  }),
);
