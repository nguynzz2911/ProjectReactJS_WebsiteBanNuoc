import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Components/Header";
import Item from "../Components/CartItems";
import Footer from '../Components/CartFooter';

export default function Cart({ cartItems }) {
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="header">
          <Header />
        </div>
        <div className="content" style={{marginTop: "150px" }}>
        {cartItems.length === 0 ? (
            <p className="text-center">Giỏ hàng của bạn đang trống.</p>
          ) : (
            cartItems.map(item => (
              <Item
                key={item.id}
                {...item} // Truyền tất cả các thuộc tính của item
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
