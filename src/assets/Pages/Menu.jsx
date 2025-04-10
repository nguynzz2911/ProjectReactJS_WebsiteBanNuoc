import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../CSS/Orders.css";
import Logo from "../../images/logo.png";

export default function Orders() {
  const [drinks, setDrinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/data/drinks.json");
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

  return (
    <div className="container-fluid">
      <div className="header">
        <Header />
      </div>

      <div className="content" style={{ marginBottom: "100px", marginTop: "150px" }}>
        {}
        <div className="text-center my-4">
          <img src={Logo} alt="logo" style={{ width: "50px" }} />
          <h2 className="fw-bold mt-2">Danh sách đồ uống</h2>
        </div>

        {}
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
            <option value="LOẠI TRÀ MATTE">LOẠI TRÀ MATTE</option>
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
              <div className="col" key={index}>
                <div className="card h-100 shadow-sm rounded-3">
                  <img src={drink.image} alt={drink.name} className="card-img-top" />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">{drink.name}</h5>
                    <p className="card-price text-danger fw-bold">
                      {Number(drink.price.replace(/,/g, "")).toLocaleString()} đ
                    </p>
                    <button className="btn btn-primary buy-button">MUA NGAY</button>
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
