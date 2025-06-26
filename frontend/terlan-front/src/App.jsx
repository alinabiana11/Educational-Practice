import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CategoriesAll from './pages/CategoriesAll';

import ProductList from './pages/ProductList';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import Sales from './pages/Sales';
import NotFound from "./pages/NotFound";


import Header from './components/Header';
import CartPage from './pages/CartPage';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories/all" element={<CategoriesAll />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/products/all" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/sales" element={<Sales />} /> 
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
