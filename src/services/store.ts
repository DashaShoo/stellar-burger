import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients';
import { ordersReducer } from './slices/orders';
import { constructorReducer } from './slices/constructor';
import { feedsReducer } from './slices/feeds';
import { userReducer } from './slices/user';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedsReducer,
  orders: ordersReducer,
  user: userReducer,
  constructorBurger: constructorReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
