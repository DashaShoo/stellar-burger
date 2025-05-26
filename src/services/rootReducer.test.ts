import { test, describe, expect } from '@jest/globals';
import { rootReducer } from './store';

import { initialUserState } from './slices/user';
import { initialFeedsState } from './slices/feeds';
import { initialOrderState } from './slices/orders';
import { initialIngredientsState } from './slices/ingredients';
import { initialConstructorFeedsState } from './slices/constructor';

describe('Root reducer: начальное состояние', () => {
  test('возвращает начальное состояние, если передан неизвестный экшен', () => {
    const fakeAction = { type: 'SOME_RANDOM_ACTION' };

    const result = rootReducer(undefined, fakeAction);

    expect(result).toEqual({
        user: initialUserState,
        feed: initialFeedsState,
        orders: initialOrderState,
        ingredients: initialIngredientsState,
        constructorBurger: initialConstructorFeedsState,
    });
  });
});
