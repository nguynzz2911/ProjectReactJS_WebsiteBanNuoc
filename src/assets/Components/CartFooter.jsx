import React from 'react'
import { useState, useEffect } from "react"
import "../CSS/CartFooter.css"
import { Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateUserInfoModal from "../Components/UpdateUserInfoModal"

export default function CartFooter({
  totalPrice = 0,
  onCheckout = () => { },
}) {
  const [userInfo, setUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) return;

    // Gọi API lấy danh sách user
    fetch('https://67cd3719dd7651e464edabb9.mockapi.io/account')
      .then(res => res.json())
      .then(data => {
        const found = data.find(u => u.tendn === username);
        if (found) setUserInfo(found);
      })
      .catch(err => console.error("Lỗi khi lấy thông tin user:", err));
  }, []);

  const formatAddress = (user) => {
    if (!user) return "";
    return `${user.sonha}, ${user.duong}, ${user.phuongxa}, ${user.quanhuyen}, ${user.thanhpho}`;
  };
  return (
    <div className="fixed-bottom bg-light border-top"> {/* Thêm class fixed-bottom và background */}
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center p-3">
          <div className="col d-flex align-items-center">
            <div className="col me-3">
              <div><strong>Họ tên:</strong> {userInfo?.hoten || "..."}</div>
              <div><strong>SĐT:</strong> {userInfo?.sdt || "..."}</div>
            </div>
            <div className="col">
              <div><strong>Địa chỉ:</strong> {formatAddress(userInfo)}</div>
              <div className="d-flex justify-content-center align-items-center">
                <button variant="outline-secondary" size="sm" className="button2 ms-3" onClick={() => setShowModal(true)}>
                  Thay đổi
                </button>
                <UpdateUserInfoModal
                  show={showModal}
                  handleClose={() => setShowModal(false)}
                  userId={userInfo?.id}
                  onSuccess={async () => {
                    const username = localStorage.getItem("username");
                    const res = await fetch('https://67cd3719dd7651e464edabb9.mockapi.io/account');
                    const data = await res.json();
                    const found = data.find(u => u.tendn === username);
                    if (found) setUserInfo(found);
                    setShowModal(false);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col text-end">
            <div className="col">
              <h5>Tổng tiền: {(totalPrice / 1000).toString()},000 VNĐ</h5>
            </div>
            <div className="col">
              <button variant="primary" onClick={onCheckout} className='button1'>
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}