import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredients';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const ingredientsState = useSelector((state: RootState) => state.ingredients);
  const { items: ingredients, loading, error } = ingredientsState;

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [ingredients.length, dispatch]);

  const currentIngredient = ingredients.find(ingredient => ingredient._id === id!);

  if (loading || !ingredients.length) {
    return <Preloader />;
  }

  if (error) {
    return (
      <p className='text text_type_main-default'>Ошибка: {error}</p>
    );
  }

  if (!currentIngredient) {
    return (
      <p className='text text_type_main-default'>Ингредиент не найден</p>
    );
  }

  return <IngredientDetailsUI ingredientData={currentIngredient} />;
};
