import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { fetchFeed } from '../../services/slices/feeds';
import { FeedInfoUI } from '../ui/feed-info';
import { TOrder } from '../../utils/types';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const dispatch = useDispatch();
  const feedState = useSelector((state: RootState) => state.feed);

  const { orders, total, totalToday, loading, error } = feedState;

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (loading) {
    return <p className='text text_type_main-default'>Загрузка...</p>;
  }

  if (error) {
    return <p className='text text_type_main-default'>Ошибка: {error}</p>;
  }

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total, totalToday }}
    />
  );
};