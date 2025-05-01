import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Components/Header";
import Item from "../Components/CartItems";
import Footer from '../Components/CartFooter';
import orders from '../../../data/order.json';
import products from '../../../data/drinks.json';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username"); // Lưu ý bạn phải lưu username khi đăng nhập
    if (!username) return;

    // Tìm đơn hàng của user
    const userOrder = orders.find(order => order.customer === username);
    if (!userOrder) return;

    // Ghép thông tin sản phẩm và số lượng
    const mergedItems = userOrder.item.map(({ item_id, quantity }) => {
      const product = products.find(p => p.id === item_id);
      return {
        id: item_id,
        name: product?.name || "Không rõ",
        price: product?.price || "0",
        image: product?.image || "",
        quantity,
      };
    });

    setCart(mergedItems);
  }, []);

  const handleDelete = (id) => {
    setCart(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    setCart(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  };

  return (
    <div className="container-fluid">
      <Header />
      <div className="content" style={{ marginTop: "150px" }}>
        {cart.length === 0 ? (
          <p className="text-center">Giỏ hàng của bạn đang trống.</p>
        ) : (
          cart.map(item => (
            <Item
              key={item.id}
              {...item}
              onDelete={handleDelete}
              onQuantityChange={handleQuantityChange}
            />
          ))
        )}
      </div>
      <Footer totalPrice={calculateTotalPrice()} />
    </div>
  );
}
