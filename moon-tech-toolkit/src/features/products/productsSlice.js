import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteProduct,
  fetchProducts,
  postProduct,
  updateProduct,
} from "./productsAPI";

const initialState = {
  products: [],
  isLoading: false,
  postSuccess: false,
  deleteSuccess: false,
  updateSuccess: false,
  isError: false,
  error: "",
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const products = fetchProducts();
    return products;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProducts",
  async (data) => {
    const products = postProduct(data);
    return products;
  }
);

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (_id, thunkAPI) => {
    const products = await deleteProduct(_id);
    thunkAPI.dispatch(removeFromList(_id));
    return products;
  }
);

export const changeProduct = createAsyncThunk(
  "products/changeProduct",
  async (product, thunkAPI) => {
    const products = await updateProduct(product);
    thunkAPI.dispatch(updateList(product));
    return products;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    togglePostSuccess: (state) => {
      state.postSuccess = false;
    },
    toggleDeleteSuccess: (state) => {
      state.deleteSuccess = false;
    },
    removeFromList: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    toggleUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
    updateList: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      state.products.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.products = [];
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.postSuccess = false;
        state.isError = false;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.postSuccess = true;
        state.isError = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.postSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(removeProduct.pending, (state) => {
        state.isLoading = true;
        state.deleteSuccess = false;
        state.isError = false;
      })
      .addCase(removeProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.deleteSuccess = true;
        state.isError = false;
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.deleteSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(changeProduct.pending, (state) => {
        state.isLoading = true;
        state.updateSuccess = false;
        state.isError = false;
      })
      .addCase(changeProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.updateSuccess = true;
        state.isError = false;
      })
      .addCase(changeProduct.rejected, (state, action) => {
        state.updateSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const {
  togglePostSuccess,
  toggleDeleteSuccess,
  toggleUpdateSuccess,
  removeFromList,
  updateList,
} = productsSlice.actions;
export default productsSlice.reducer;
