import React from 'react'
import { useState, useEffect } from "react"
import { Row, Col, Image, Button, InputGroup, Form, Spinner } from "react-bootstrap"
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import BillItems from "../Components/BillItems"

export default function Bills() {
    const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true); // Thay bằng giá trị động nếu cần

  useEffect(() => {
    const currentCustomer = localStorage.getItem("username");
    fetch("https://68144f46225ff1af16287876.mockapi.io/history") // link đến MockAPI
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(bill => bill.customer === currentCustomer);
        setBills(filtered.reverse()); // Hiển thị mới nhất lên đầu
        setLoading(false);
      });
  }, []);
  
  return (
    <>
        <div className="container-fluid">
        <Header />

        <div className="content p-4" style={{marginTop: "150px"}}>
          <h3>Lịch sử đơn hàng</h3>
          {loading ? (
            <Spinner animation="border" />
          ) : bills.length === 0 ? (
            <p>Không có đơn hàng nào.</p>
          ) : (
            bills.map(bill => (
              <BillItems
                key={bill.id}
                id={bill.id}
                customer={bill.customer}
                time={bill.time}
                date={bill.date}
                total={bill.total}
                item={bill.item} // Giả sử bạn đã có mảng item trong bill
              />
            ))
          )}
        </div>

        <Footer />
      </div>
    </>
  )
}
