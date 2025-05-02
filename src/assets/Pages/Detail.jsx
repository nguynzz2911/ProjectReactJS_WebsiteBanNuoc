import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import '../CSS/Detail.css'

export default function Detail({ onAddToCart}) {
  const { state } = useLocation();
  const navigate = useNavigate();

  const drink = state?.drink;

  

  if (!drink) {
    return (
      <div className="text-center mt-5">
        <p>Không tìm thấy sản phẩm.</p>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>Quay lại</button>
      </div>
    );
  }

  // const handleBuyNow = () => {
  //   // Tạo một object đại diện cho sản phẩm trong giỏ hàng
  //   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  //   if (!isLoggedIn) {
  //     alert("Vui lòng đăng nhập để mua hàng.");
  //     navigate("/login");
  //     return;
  //   }
  //   const cartItem = {
  //     id: drink.id,
  //     name: drink.name,
  //     image: drink.image,
  //     price: drink.price,
  //   };
  //   onAddToCart(cartItem);
  //   alert(`Đã chọn mua: ${drink.name}`);
  // };

  const handleBuyNow = async () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("username");
  
    if (!isLoggedIn || !username) {
      alert("Vui lòng đăng nhập để mua hàng.");
      navigate("/login");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3001/api/orders/add-to-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, itemId: drink.id })
      });
  
      const result = await response.json();
      if (result.success) {
        alert(`Đã thêm ${drink.name} vào giỏ hàng.`);
        // const cartItem = {
        //   id: drink.id,
        //   name: drink.name,
        //   image: drink.image,
        //   price: drink.price,
        // };
        // onAddToCart(cartItem);
      } else {
        alert("Có lỗi xảy ra: " + result.message);
      }
    } catch (err) {
      console.error("Lỗi khi thêm vào giỏ hàng:", err);
      alert("Không thể thêm sản phẩm. Kiểm tra kết nối.");
    }
  };

  const handleBuyNowAPI = async () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("username");
  
    if (!isLoggedIn || !username) {
      alert("Vui lòng đăng nhập để mua hàng.");
      navigate("/login");
      return;
    }
  
    try {
      // 1) Lấy tất cả orders
      const resAll = await fetch("https://67cd3719dd7651e464edabb9.mockapi.io/order");
      const allOrders = await resAll.json();
  
      // 2) Tìm đơn hàng của user
      const userOrder = allOrders.find(o => o.customer === username);
      if (!userOrder) {
        alert("Bạn chưa có giỏ hàng, vui lòng thực hiện thêm lần đầu qua trang Giỏ hàng.");
        return;
      }
  
      // 3) Cập nhật mảng item
      let updatedItems;
      const existingItem = userOrder.item.find(i => i.item_id === drink.id);
      if (existingItem) {
        updatedItems = userOrder.item.map(i =>
          i.item_id === drink.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updatedItems = [
          ...userOrder.item,
          { item_id: drink.id, quantity: 1 }
        ];
      }
  
      // 4) Gửi PUT lên MockAPI để cập nhật
      const resUpdate = await fetch(
        `https://67cd3719dd7651e464edabb9.mockapi.io/order/${userOrder.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer: username,
            item: updatedItems
          })
        }
      );
  
      if (!resUpdate.ok) throw new Error("Update order failed");
  
      alert(`Đã thêm ${drink.name} vào giỏ hàng của bạn.`);
    } catch (err) {
      console.error("Lỗi khi cập nhật giỏ hàng:", err);
      alert("Không thể cập nhật giỏ hàng. Vui lòng thử lại sau.");
    }
  };
  

  return (
    <div className="container-fluid">
      <Header />

      <div className="content" style={{ marginTop: "150px", marginBottom: "100px" }}>
        <div className="container">
          <div className="row my-5">
            <div className="col-md-6">
              <img src={drink.image} alt={drink.name} className="img-fluid rounded-4" />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold">{drink.name}</h2>
              <p className="text-danger fs-4 fw-bold">
                {Number(drink.price.replace(/,/g, "")).toLocaleString()} đ
              </p>
              <p><strong>Loại:</strong> {drink.type}</p>
              <p><strong>Mô tả:</strong> {drink.description || "Chưa có mô tả."}</p>
              <button className="btn btn-primary text-white px-4 py-2 mt-3" onClick={handleBuyNowAPI} >Mua ngay</button>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}