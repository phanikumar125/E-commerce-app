import { createSlice } from '@reduxjs/toolkit';
import { products } from '../../data/products';

const initialState = {
  items: products,
  query: '',
  category: 'All',
  sortBy: 'featured',
  maxPrice: 10000,
  wishlist: JSON.parse(localStorage.getItem('wishlist') || '[]'),
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setQuery: (state, action) => { state.query = action.payload; },
    setCategory: (state, action) => { state.category = action.payload; },
    setSortBy: (state, action) => { state.sortBy = action.payload; },
    setMaxPrice: (state, action) => { state.maxPrice = Number(action.payload); },
    toggleWishlist: (state, action) => {
      const id = action.payload;
      state.wishlist = state.wishlist.includes(id)
        ? state.wishlist.filter((item) => item !== id)
        : [...state.wishlist, id];
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    },
    clearFilters: (state) => {
      state.query = '';
      state.category = 'All';
      state.sortBy = 'featured';
      state.maxPrice = 10000;
    },
  },
});

export const { setQuery, setCategory, setSortBy, setMaxPrice, toggleWishlist, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
