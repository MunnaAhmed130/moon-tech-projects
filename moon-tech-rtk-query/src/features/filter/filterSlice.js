import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stock: false,
  brands: [],
  keyword: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggle: (state) => {
      state.stock = !state.stock;
    },
    toggleBrands: (state, action) => {
      if (!state.brands.includes(action.payload)) {
        state.brands.push(action.payload);
      } else {
        state.brands = state.brands.filter((brand) => brand !== action.payload);
      }
    },
    clearAll: (state) => {
      state.stock = false;
      state.brands = [];
      state.keyword = "";
    },
  },
});

export const { toggle, toggleBrands, clearAll } = filterSlice.actions;
export default filterSlice.reducer;
