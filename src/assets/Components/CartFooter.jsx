import React from 'react'
import { useState } from "react"
import { Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";

export default function CartFooter({
    totalPrice = 0,
    onSelectAll = () => {},
    onCheckout = () => {},
  }) {
    const [selectAll, setSelectAll] = useState(false)

    const handleSelectAll = (checked) => {
      setSelectAll(checked)
      onSelectAll(checked)
    }
  return (
    <div className="fixed-bottom bg-light border-top"> {/* Thêm class fixed-bottom và background */}
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center p-3">
          <div className="col-md-6 d-flex align-items-center">
            <h5>Tổng tiền: {totalPrice.toLocaleString("vi-VN")} VNĐ</h5>
          </div>
          <div className="col text-end">
            <Button variant="primary" onClick={onCheckout}>
              Thanh toán
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}