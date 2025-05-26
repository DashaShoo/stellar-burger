import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from 'src/utils/types';

export interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun: {
      prepare(ingredient: TIngredient) {
        return {
          payload: { ...ingredient, id: nanoid() }
        };
      },
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        state.bun = action.payload;
      }
    },
    clearBun(state) {
      state.bun = null;
    },
    addIngredient: {
      prepare(ingredient: TIngredient) {
        return {
          payload: { ...ingredient, id: nanoid() }
        };
      },
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        state.ingredients = [...state.ingredients, action.payload];
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        ingredient => ingredient.id !== action.payload
      );
    },
    moveIngredient(
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) {
      const { fromIndex, toIndex } = action.payload;
      const ingredientList = [...state.ingredients];
      const [moved] = ingredientList.splice(fromIndex, 1);
      ingredientList.splice(toIndex, 0, moved);
      state.ingredients = ingredientList;
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  setBun,
  clearBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
export { initialState as initialConstructorFeedsState };