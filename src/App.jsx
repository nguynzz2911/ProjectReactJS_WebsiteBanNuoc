import HomePage from './assets/Pages/HomePage.jsx'
import { useState } from 'react'
import Detail from './assets/Pages/Detail.jsx'
import News from './assets/Pages/News.jsx'
import Cart from './assets/Pages/Cart.jsx'
import Contact from './assets/Pages/Contact.jsx'
import About from './assets/Pages/AboutUs.jsx'
import Menu from './assets/Pages/Menu.jsx'
import Login from './assets/Pages/Login.jsx'  
import Signup from './assets/Pages/Signup.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
// import drinksData from '../data/drinks.json';
import NewsDetail from './assets/Pages/NewsDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex > -1) {
      // Nếu có rồi, tăng số lượng
      const updatedCart = cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedCart);
    } else {
      // Nếu chưa có, thêm mới vào giỏ hàng với số lượng là 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail/:id" element={<Detail onAddToCart={addToCart}/>}/>
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/menu" element={<Menu onAddToCart={addToCart}/>} />
          <Route path="/cart" element={<Cart cartItems={cartItems}/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>  
    </>
  )
}

export default App