import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // [{ id, title, price, discont_price, image, count }]
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, title, price, discont_price, image, count } = action.payload;
      const existing = state.items.find(item => item.id === id);
      if (existing) {
        existing.count += count;
      } else {
        state.items.push({ id, title, price, discont_price, image, count });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    changeCount(state, action) {
      const { id, count } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) item.count = count;
    },
    clearCart(state) {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, changeCount, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
