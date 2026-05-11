import { createSlice } from '@reduxjs/toolkit';

const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
const savedToken = localStorage.getItem('token');

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: savedUser, token: savedToken, error: '' },
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      if (email === 'customer@example.com' && password === 'customer123') {
        state.user = { name: 'Krishna Customer', email, role: 'Premium Customer' };
        state.token = 'mock-jwt-token';
        state.error = '';
        localStorage.setItem('user', JSON.stringify(state.user));
        localStorage.setItem('token', state.token);
      } else {
        state.error = 'Invalid email or password';
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
  },
});

export const { login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
