import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../CSS/Orders.css";
import Logo from "../../images/logo.png";

export default function Menu({onAddToCart}) {
  const [drinks, setDrinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        // const response = await fetch("/data/drinks.json");
        const response = await fetch("https://68144f46225ff1af16287876.mockapi.io/drinks");
        const data = await response.json();
        setDrinks(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu drinks:", error);
      }
    }

    fetchData();
  }, []);

  // Lọc dữ liệu
  const filteredDrinks = drinks.filter((drink) => {
    const matchesSearch = drink.name.toLowerCase().includes(searchTerm.toLowerCase());

    const price = Number(drink.price.replace(/,/g, ""));
    const matchesPrice =
      selectedPrice === "" ||
      (selectedPrice === "low" && price < 20000) ||
      (selectedPrice === "high" && price >= 20000);

    const matchesType = selectedType === "" || drink.type === selectedType;

    return matchesSearch && matchesPrice && matchesType;
  });

  const handleCardClick = (drink) => {
    navigate(`/detail/${drink.id}`, { state: { drink } });
  };

  // const handleBuyNow = (drink) => {
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

  const handleBuyNow = async (drink) => {
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

  const handleBuyNowAPI = async (drink) => {
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
      <div className="header">
        <Header />
      </div>

      <div className="content" style={{ marginBottom: "100px", marginTop: "150px" }}>
        
        <div className="text-center my-4">
          <img src={Logo} alt="logo" style={{ width: "50px" }} />
          <h2 className="fw-bold mt-2">Danh sách đồ uống</h2>
        </div>

        
        <div className="filter-bar d-flex flex-wrap justify-content-center gap-3 mb-4">
          <div className="input-group" style={{ maxWidth: "250px" }}>
            <span className="input-group-text"><i className="bi bi-search"></i></span>
            <input
              type="text"
              className="form-control form-control-sm input-search"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}

            />
          </div>

          <select
            className="form-select"
            style={{ maxWidth: "200px" }}
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value="">Chọn theo giá</option>
            <option value="low">Dưới 20.000₫</option>
            <option value="high">Từ 20.000₫ trở lên</option>
          </select>

          <select
            className="form-select"
            style={{ maxWidth: "200px" }}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Loại</option>
            <option value="LOẠI THUẦN TRÀ">LOẠI THUẦN TRÀ</option>
            <option value="LOẠI TRÀ SỮA">LOẠI TRÀ SỮA</option>
            <option value="LOẠI TRÀ LATTE">LOẠI TRÀ LATTE</option>
            <option value="LOẠI TRÀ TRANH">LOẠI TRÀ TRANH</option>
            <option value="LOẠI TRÀ TRÁI CÂY">LOẠI TRÀ TRÁI CÂY</option>
          </select>
        </div>

        {}
        <p className="text-center text-muted">
          Tìm thấy <strong>{filteredDrinks.length}</strong> đồ uống
        </p>

        {}
        <div className="drink-list row row-cols-1 row-cols-md-4 g-4">
          {filteredDrinks.length === 0 ? (
            <p className="text-center">Không tìm thấy đồ uống phù hợp.</p>
          ) : (
            filteredDrinks.map((drink, index) => (
              <div className="col" key={drink.id}>
                <div
                  className="card h-100 shadow-sm rounded-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCardClick(drink)}
                >
                  <img src={drink.image} alt={drink.name} className="card-img-top" />
                  <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{drink.name}</h5>
                  <p className="card-price text-danger fw-bold">
                    {Number(drink.price.replace(/,/g, "")).toLocaleString()} đ
                  </p>
                  <button
                    className="btn btn-primary btn-sm mt-2"
                    onClick={(e) => {
                    e.stopPropagation(); 
                    handleBuyNowAPI(drink);
                    }}
                  >
                    Mua ngay
                  </button>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="footer mt-5">
        <Footer />
      </div>
    </div>
  );
}
