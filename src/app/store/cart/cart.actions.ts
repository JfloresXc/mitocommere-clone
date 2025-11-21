import { Product } from '@/modules/products/models/Product';
import { createActionGroup, props } from '@ngrx/store';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Add to Cart': props<{ product: Product }>(),
    'Delete from Cart': props<{ product: Product }>(),
  },
});
