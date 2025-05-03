import React, { useEffect, useState, useRef } from 'react';
import "../CSS/Header.css"
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../images/logo.png"
import Account from "../../images/account.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from "../../images/cart.png"

export default function Header() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [role, setRole] = useState(localStorage.getItem("role") || ""); // Lấy vai trò từ localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // cuộn xuống
        setShow(false);
      } else {
        // cuộn lên
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  useEffect(() => {
    // Đảm bảo cập nhật trạng thái đăng nhập khi reload hoặc từ trang khác
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    checkLogin();
    window.addEventListener("storage", checkLogin); // Nếu bạn có nhiều tab
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("role"); // Xóa vai trò người dùng nếu cần
    alert("Đăng xuất thành công!");
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <>
      <div className={`header-container sticky-top ${show ? 'show' : 'hide'}`}>
        <div className="container-fluid contn row ">
          <div className="col" style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
            <Link to={`/`}><button className='btn'>Trang chủ</button></Link>
          </div>
          <div className="col" style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
            <Link to={`/menu`}><button className='btn'>Menu</button></Link>
          </div>
          <div className="col" style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
            <Link to={`/about`}><button className='btn'>Giới thiệu</button></Link>
          </div>
          <div className="col" style={{ overflow: "hidden", display: 'flex', justifyContent: 'center', alignItems: "center" }}>
            <Link to={`/`} style={{ overflow: "hidden", display: 'flex', justifyContent: 'center', alignItems: "center" }}><img src={Logo} alt="" style={{ objectFit: 'cover', borderRadius: "10px" }} className='img-fluid logo' /></Link>
          </div>
          <div className="col" style={{ overflow: "hidden", display: 'flex', justifyContent: 'center', alignItems: "center" }}>
            <Link to={`/news`}><button className='btn'>Tin tức</button></Link>
          </div>
          <div className="col" style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
            <button
              style={{ overflow: "hidden", display: 'flex', justifyContent: 'center', alignItems: "center" }}
              className='btn'
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/cart");
                } else {
                  alert("Vui lòng đăng nhập để sử dụng.");
                  navigate("/login");
                }
              }}
            >
              Giỏ hàng
              <img src={Cart} alt="" style={{ width: "20%", height: "auto", marginLeft: '20px' }} className='img-fluid' />
            </button>
          </div>
          <div className="col" style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }} ref={dropdownRef}>
            <img src={Account} alt="account" className='img-fluid'
              style={{ width: "30%", height: "auto", cursor: "pointer" }}
              onClick={toggleDropdown} />
          </div>

          {showDropdown && (
            <div className="account-dropdown">
              {!isLoggedIn ? (
                <Link to="/login" className="dropdown-item">Đăng nhập</Link>
              ) : (
                role === "admin" ? (
                  <>
                    <Link to="/admin" className="dropdown-item">Quản lý</Link>
                    <Link to="/bills" className="dropdown-item">Lịch sử mua</Link>
                    <Link to="/account" className="dropdown-item">Tài khoản</Link>
                    <span onClick={handleLogout} className="dropdown-item" style={{ cursor: "pointer" }}>
                      Đăng xuất
                    </span>
                  </>
                ) : (
                  <>
                    <Link to="/bills" className="dropdown-item">Lịch sử mua</Link>
                    <Link to="/account" className="dropdown-item">Tài khoản</Link>
                    <span onClick={handleLogout} className="dropdown-item" style={{ cursor: "pointer" }}>
                      Đăng xuất
                    </span>
                  </>
                )
              )}
            </div>
          )}

        </div>
      </div>
    </>
  )
}
