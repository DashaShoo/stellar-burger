import React, { FC, useMemo } from 'react';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { BurgerConstructorUI } from '../ui/burger-constructor';
import { createOrder, clearCurrentOrder } from '../../services/slices/orders';
import { TConstructorIngredient } from '../../utils/types';
import { clearConstructor } from '../../services/slices/constructor';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructor = useSelector((state: RootState) => state.constructorBurger);
  const isOrderLoading = useSelector((state: RootState) => state.orders.loading);
  const currentOrder = useSelector((state: RootState) => state.orders.currentOrder);
  const user = useSelector((state: RootState) => state.user.user);

  // Отправка заказа
  const handleOrder = () => {
    if (!constructor.bun || isOrderLoading) return;

    if (!user) {
      navigate('/login', { replace: true });
      return;
    }

    const ingredientIds = [
      constructor.bun._id,
      ...constructor.ingredients.map(i => i._id),
      constructor.bun._id,
    ];

    dispatch(createOrder(ingredientIds));
  };

  const handleCloseOrder = () => {
    dispatch(clearCurrentOrder());
    dispatch(clearConstructor());
  };

  // Подсчёт цены
  const totalPrice = useMemo(() => {
    const ingredientsPrice = constructor.ingredients.reduce(
      (acc, ingredient: TConstructorIngredient) => acc + ingredient.price,
      0
    );
    const bunPrice = constructor.bun ? constructor.bun.price * 2 : 0;
    return bunPrice + ingredientsPrice;
  }, [constructor]);

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={isOrderLoading}
      constructorItems={constructor}
      orderModalData={currentOrder}
      onOrderClick={handleOrder}
      closeOrderModal={handleCloseOrder}
    />
  );
};
