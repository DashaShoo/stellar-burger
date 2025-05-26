import React, { forwardRef, useMemo } from 'react';
import { useSelector, RootState } from '../../services/store';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '../../utils/types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const { bun, ingredients: selectedIngredients } = useSelector(
    (state: RootState) => state.constructorBurger
  );

  const counters = useMemo(() => {
    const map: Record<string, number> = {};

    selectedIngredients.forEach((item: TIngredient) => {
      map[item._id] = (map[item._id] || 0) + 1;
    });

    if (bun) {
      map[bun._id] = 2;
    }

    return map;
  }, [bun, selectedIngredients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={counters}
      ref={ref}
    />
  );
});
