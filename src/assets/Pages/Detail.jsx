import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import '../CSS/Detail.css'
import { useState } from "react";
import cartIcon from "/src/images/cart.png";

export default function Detail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const drink = state?.drink;

  if (!drink) {
    return (
      <div className="text-center mt-5">
        <p>Không tìm thấy sản phẩm.</p>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>Quay lại</button>
      </div>
    );
  }

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
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
              <div className="mb-3 mt-4">
                <strong>Số lượng:</strong>
                <div className="quantity-selector d-flex align-items-center mt-2">
                  <button className="btn btn-outline-secondary" onClick={decreaseQuantity}>-</button>
                  <input
                    type="text"
                    className="form-control mx-2 text-center"
                    value={quantity}
                    readOnly
                    style={{ width: "60px" }}
                  />
                  <button className="btn btn-outline-secondary" onClick={increaseQuantity}>+</button>
                </div>
              </div>

              <div className="d-flex gap-3 mt-4">
              <button className="btn btn-outline-black d-flex align-items-center gap-2">
  <img src={cartIcon} alt="Cart" style={{ width: "20px", height: "20px" }} />
  Thêm vào giỏ hàng
</button>

<button
  className="btn btn-primary btn-sm mt-2"
  onClick={() => alert(`Đã chọn mua: ${drink.name}`)}
>
  Mua ngay
</button>

              </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
