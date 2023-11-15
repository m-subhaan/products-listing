import { RootState } from "../reducers";

export const selectProducts = (state: RootState) => state.products.data;
export const selectLoading = (state: RootState) => state.products.loading;
export const selectError = (state: RootState) => state.products.error;
export const selectCartItems = (state: RootState) => state.cart.items;