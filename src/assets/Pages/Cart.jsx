import React from 'react'
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Components/Header";
import Item from "../Components/CartItems";
import Footer from '../Components/CartFooter';

export default function Cart({ cartItems }) {
  const [cart, setCart] = useState(cartItems);

  const handleDelete = (id) => {
    setCart(prevItems => prevItems.filter(item => item.id !== id));
  };
  const calculateTotalPrice = () => {
    console.log(cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0));
    
    return cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  };
  const handleQuantityChange = (id, newQuantity) => {
    setCart(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  return (
    <>
      <div className="container-fluid">
        <div className="header">
          <Header />
        </div>
        <div className="content" style={{marginTop: "150px" }}>
        {cart.length === 0 ? (
            <p className="text-center">Giỏ hàng của bạn đang trống.</p>
          ) : (
            cart.map(item => (
              <Item
                key={item.id}
                {...item} // Truyền tất cả các thuộc tính của item
                onDelete={handleDelete}
                onQuantityChange={handleQuantityChange} 
              />
            ))
          )}
        </div>
        <div className="footer">
          <Footer totalPrice={calculateTotalPrice()}></Footer>
        </div>
      </div>
    </>
  )
}
