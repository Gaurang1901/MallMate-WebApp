import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import ShopAll from '../pages/categories/ShopAll';
import CategoryPage from '../pages/categories/CategoryPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<ShopAll />} />
      <Route path="/category/:categoryId" element={<CategoryPage categoryId='1' categoryName='Electronics' />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes; 