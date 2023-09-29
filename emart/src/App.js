import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom'
import Products from './components/Products';
import Product from './components/Product';
import Login from './components/Login';
import { Register } from './components/Register';
import Cart from './components/Cart';
import AdminLogin from './admin/AdminLogin';
import Admin from './admin/page/Admin';
import AdminProduct from './admin/page/AdminProduct'
import AdminAddProduct from './admin/page/AdminAddProduct';
import ProductState from './context/ProductState';

function App() {
  return (
    <>
      <ProductState>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/products' element={<Products />} />
          <Route exact path='/products/:id' element={<Product />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route path='admin'>
            <Route index element={<Admin />} />
            <Route path='login' element={<AdminLogin />} />
            <Route path="product" element={<AdminProduct />} />
            <Route path='addproduct' element={<AdminAddProduct />} />
          </Route>
        </Routes>
      </ProductState>
    </>
  );
}

export default App;
