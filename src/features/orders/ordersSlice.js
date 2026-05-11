import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { items: JSON.parse(localStorage.getItem('orders') || '[]') },
  reducers: {
    placeOrder: (state, action) => {
      const order = { id: `ORD-${Date.now()}`, date: new Date().toLocaleDateString(), status: 'Confirmed', ...action.payload };
      state.items.unshift(order);
      localStorage.setItem('orders', JSON.stringify(state.items));
    },
  },
});

export const { placeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
