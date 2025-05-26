import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { fetchUser } from '../../services/slices/user';
import { AppHeaderUI } from '@ui';

const hasAccessToken = (): boolean =>
  document.cookie.includes('accessToken=');

export const AppHeader: FC = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (hasAccessToken() && !user && !loading) {
      dispatch(fetchUser());
    }
  }, [dispatch, user, loading]);

  return <AppHeaderUI userName={user?.name ?? ''} />;
};
