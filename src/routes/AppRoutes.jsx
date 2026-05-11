import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Wishlist from '../pages/Wishlist';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Orders from '../pages/Orders';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return <Layout><Routes><Route path="/" element={<Home />} /><Route path="/shop" element={<Shop />} /><Route path="/product/:id" element={<ProductDetails />} /><Route path="/cart" element={<Cart />} /><Route path="/wishlist" element={<Wishlist />} /><Route path="/checkout" element={<Checkout />} /><Route path="/login" element={<Login />} /><Route path="/profile" element={<Profile />} /><Route path="/orders" element={<Orders />} /><Route path="*" element={<NotFound />} /></Routes></Layout>;
}
