import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import accountData from "../../../public/data/account.json"; // ✅ Import file JSON
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function Login() {
  const [tendn, setTendn] = useState("");
  const [matkhau, setMatkhau] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = accountData.find(
      (acc) => acc.tendn === tendn && acc.matkhau === matkhau
    );

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", tendn); // Lưu nếu cần hiển thị tên
      navigate("/");
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  return (
    <>
        <div className="container-fluid">
        <div className="header">
            <Header />
        </div>
        <div className="content" style={{ maxWidth: "400px", justifyContent: "center", margin: "auto", marginTop: "150px" }}>
        <h3 className="mb-4 text-center">Đăng nhập</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group mb-3">
          <label>Tên đăng nhập</label>
          <input
            type="text"
            className="form-control"
            value={tendn}
            onChange={(e) => setTendn(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label>Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            value={matkhau}
            onChange={(e) => setMatkhau(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Đăng nhập
        </button>
      </form>
        </div>
        <div className="footer">
            <Footer></Footer>
        </div>
        </div>
    </>      
  );
}
