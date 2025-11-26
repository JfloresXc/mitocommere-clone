import { Product } from '@/modules/products/models/Product';
import { createReducer, on } from '@ngrx/store';
import { CartActions, CartLocalStorageActions } from './cart.actions';

export const initialCartState: readonly Product[] = [];

export const cartReducer = createReducer(
  initialCartState,
  on(CartActions.updateQuantity, (state, { idProduct, quantity }) => {
    if (quantity <= 0) return state.filter((item) => item.id !== idProduct);

    return state.map((item) => (item.id === idProduct ? { ...item, quantity } : item));
  }),
  on(CartActions.addToCart, (state, { product }) => {
    let findedProduct = state.find((item) => item.id == product.id);

    if (findedProduct) {
      return state.map((item) =>
        item.id === findedProduct?.id ? { ...item, quantity: (item.quantity ?? 0) + 1 } : item,
      );
    } else {
      findedProduct = { ...product, quantity: 1 };
      return [...state, findedProduct];
    }
  }),
  on(CartActions.deleteFromCart, (state, { product }) => {
    return state.filter((item) => item.id !== product.id);
  }),
  on(CartActions.clearCart, () => initialCartState),
  on(CartLocalStorageActions.loadCartFromLocalStorageSuccess, (state, { products }) => products),
);
