import React, { FC, memo, useCallback } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from 'react-redux';
import { moveIngredient, removeIngredient } from '../../services/slices/constructor';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const moveUp = useCallback(() => {
      if (index > 0) {
        dispatch(moveIngredient({ fromIndex: index, toIndex: index - 1 }));
      }
    }, [dispatch, index]);

    const moveDown = useCallback(() => {
      if (index < totalItems - 1) {
        dispatch(moveIngredient({ fromIndex: index, toIndex: index + 1 }));
      }
    }, [dispatch, index, totalItems]);

    const remove = useCallback(() => {
      dispatch(removeIngredient(ingredient.id));
    }, [dispatch, ingredient.id]);

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={moveUp}
        handleMoveDown={moveDown}
        handleClose={remove}
      />
    );
  }
);
