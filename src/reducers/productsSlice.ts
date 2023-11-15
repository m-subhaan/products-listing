import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../constants";
import { Data } from "../types";

interface State {
  data: Data[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  data: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Data[]>) => {
      state.data = Object.keys(action.payload).length ?action.payload : [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(response);
      dispatch(setProducts(data? data: []));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
      throw error;
    }
  }
);

export const { setProducts, setLoading, setError } = productsSlice.actions;
export default productsSlice.reducer;
