import { Product } from '@/modules/products/models/Product';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Update Quantity': props<{ idProduct: string; quantity: number }>(),
    'Delete from Cart': props<{ product: Product }>(),
    'Clear Cart': emptyProps,
    'Add to Cart': props<{ product: Product }>(),
  },
});

export const CartLocalStorageActions = createActionGroup({
  source: 'Cart Local Storage',
  events: {
    'Load Cart from Local Storage': emptyProps(),
    'Load Cart from Local Storage Success': props<{ products: Product[] }>(),
  },
});
