import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap, withLatestFrom } from 'rxjs';
import { CartActions, CartLocalStorageActions } from './cart.actions';
import { selectCartProducts } from './cart.selectors';

const CART_KEY = 'cart_items';

@Injectable({
  providedIn: 'root',
})
export class CartEffects {
  store = inject(Store);
  action = inject(Actions);

  loadCartFromLocalStorage = createEffect(
    () => {
      return this.action.pipe(
        ofType(CartLocalStorageActions.loadCartFromLocalStorage),
        map(() => {
          try {
            const cart = localStorage.getItem(CART_KEY);
            const cartParsed = cart ? JSON.parse(cart) : [];
            return CartLocalStorageActions.loadCartFromLocalStorageSuccess({
              products: cartParsed,
            });
          } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            return CartLocalStorageActions.loadCartFromLocalStorageSuccess({
              products: [],
            });
          }
        }),
      );
    },
    {
      dispatch: true,
    },
  );

  addToCart$ = createEffect(
    () =>
      this.action.pipe(
        ofType(CartActions.addToCart),
        withLatestFrom(this.store.select(selectCartProducts)),
        tap(([, cart]) => {
          console.log(cart);
          try {
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
          } catch (error) {
            console.error('Error saving cart to localStorage:', error);
          }
        }),
      ),
    { dispatch: false },
  );
}
