import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { addIngredient, setBun } from '../../services/slices/constructor';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(({ ingredient, count }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const onAddIngredient = () => {
    if (ingredient.type === 'bun') {
      dispatch(setBun(ingredient));
    } else {
      dispatch(addIngredient(ingredient));
    }
  };

  return (
    <BurgerIngredientUI
      ingredient={ingredient}
      count={count}
      locationState={{ background: location }}
      handleAdd={onAddIngredient}
    />
  );
});
