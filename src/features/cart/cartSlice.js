import { createSlice } from '@reduxjs/toolkit';

const loadCart = () => JSON.parse(localStorage.getItem('cart') || '[]');
const saveCart = (items) => localStorage.setItem('cart', JSON.stringify(items));

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: loadCart(), coupon: '' },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const found = state.items.find((item) => item.id === product.id);
      if (found) found.quantity += 1;
      else state.items.push({ ...product, quantity: 1 });
      saveCart(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCart(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((cartItem) => cartItem.id === id);
      if (item) item.quantity = Math.max(1, quantity);
      saveCart(state.items);
    },
    clearCart: (state) => { state.items = []; saveCart([]); },
    applyCoupon: (state, action) => { state.coupon = action.payload.trim().toUpperCase(); },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, applyCoupon } = cartSlice.actions;
export default cartSlice.reducer;
