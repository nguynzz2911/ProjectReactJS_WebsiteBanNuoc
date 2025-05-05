import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Components/Header";
import Item from "../Components/CartItems";
import Footer from '../Components/CartFooter';
import orders from '../../../data/order.json';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [data, setData] = useState([])
  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetch('https://68144f46225ff1af16287876.mockapi.io/drinks')
        .then(res => res.json())
        .then(products => setProducts(products)) // Corrected to setProducts(products)
        .catch(err => console.log(err));
  }, []);

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
            console.log(product.price);
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
    }, [products]);
    

  useEffect(() => {
    let newTotal = 0;
  
    cart.forEach(item => {
      const price = Number(item.price.toString().replace(/,/g, ""));
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

  const handleCheckout = async () => {
    const username = localStorage.getItem("username");
    if (!username || cart.length === 0) return;
  
    const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
    const total = cart.reduce((acc, item) => {
      const price = Number(item.price.toString().replace(/,/g, "")) / 1000;
      return acc + price * item.quantity;
    }, 0);

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;
  
    const historyData = {
      customer: username,
      date: today,
      total: total,
      time: currentTime,
      item: cart.map(({ id, quantity }) => ({
        item_id: id,
        quantity,
      }))
    };
  
    try {
      await fetch('https://68144f46225ff1af16287876.mockapi.io/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(historyData)
      });

      const res = await fetch('https://67cd3719dd7651e464edabb9.mockapi.io/order');
    const orders = await res.json();
    const currentOrder = orders.find(order => order.customer === username);

    if (currentOrder) {
      await fetch(`https://67cd3719dd7651e464edabb9.mockapi.io/order/${currentOrder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentOrder, item: [] }),
      });
    }
  
      alert("Thanh toán thành công!");
      setCart([]); // Xoá giỏ hàng sau khi thanh toán
    } catch (error) {
      console.error("Thanh toán thất bại:", error);
      alert("Đã xảy ra lỗi khi thanh toán.");
    }
  };
  

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
      <Footer totalPrice={totalPrice} onCheckout={handleCheckout}/>
    </div>
  );
}
