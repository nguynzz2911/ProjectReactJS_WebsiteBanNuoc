import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Components/Header";
import Item from "../Components/CartItems";
import Footer from '../Components/CartFooter';
import orders from '../../../data/order.json';
import products from '../../../data/drinks.json';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [data, setData] = useState([])

    useEffect(() => {
      const username = localStorage.getItem("username");
      if (!username) return;
    
      fetch('https://67cd3719dd7651e464edabb9.mockapi.io/order')
        .then(res => res.json())
        .then(data => {
          const userOrder = data.find(order => order.customer === username);
          if (!userOrder) return;
    
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
        })
        .catch(err => console.log(err));
    }, []);
    

  useEffect(() => {
    let newTotal = 0;
  
    cart.forEach(item => {
      const price = Number(item.price.toString().replace(/,/g, "")) / 1000;
      newTotal += price * item.quantity;
    });
  
    setTotalPrice(newTotal);
  }, [cart]);

  const handleDelete = (id) => {
    setCart(prevItems => prevItems.filter(item => item.id !== id));
  };

  // const handleDelete = async (id) => {
  //   if (!orderId) return;

  //   try {
  //     const res = await fetch(`https://67cd3719dd7651e464edabb9.mockapi.io/order/${orderId}`);
  //     const order = await res.json();

  //     const updatedItems = order.item.filter(item => item.item_id !== id);

  //     await fetch(`https://67cd3719dd7651e464edabb9.mockapi.io/order/${orderId}`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ ...order, item: updatedItems })
  //     });

  //     setCart(prevItems => prevItems.filter(item => item.id !== id));
  //   } catch (error) {
  //     console.error("Xóa sản phẩm thất bại:", error);
  //   }
  // };

  const handleQuantityChange = (id, newQuantity) => {
    setCart(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // const handleQuantityChange = async (id, newQuantity) => {
  //   if (!orderId) return;

  //   try {
  //     const res = await fetch(`https://67cd3719dd7651e464edabb9.mockapi.io/order/${orderId}`);
  //     const order = await res.json();

  //     const updatedItems = order.item.map(item =>
  //       item.item_id === id ? { ...item, quantity: newQuantity } : item
  //     );

  //     await fetch(`https://67cd3719dd7651e464edabb9.mockapi.io/order/${orderId}`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ ...order, item: updatedItems })
  //     });

  //     setCart(prevItems =>
  //       prevItems.map(item =>
  //         item.id === id ? { ...item, quantity: newQuantity } : item
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Cập nhật số lượng thất bại:", error);
  //   }
  // };

  return (
    <div className="container-fluid">
      <Header />
      <div className="content" style={{ marginTop: "150px", marginBottom: "100px" }}>
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
      <Footer totalPrice={totalPrice} />
    </div>
  );
}
