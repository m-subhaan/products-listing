   // src/reducers/index.ts
   import { combineReducers } from '@reduxjs/toolkit';
   import productsReducer from './productsSlice';
   import cartSliceReducer from './cartSlice';

   const rootReducer = combineReducers({
     products: productsReducer,
     cart: cartSliceReducer,
   });

   export type RootState = ReturnType<typeof rootReducer>;
   export default rootReducer;
