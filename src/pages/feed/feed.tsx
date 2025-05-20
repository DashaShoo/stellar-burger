import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { fetchFeed } from '../../services/slices/feeds';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.feed
  );

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
