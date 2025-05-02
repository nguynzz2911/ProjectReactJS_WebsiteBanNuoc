"use client"

import { useState } from "react"
import { Row, Col, Image, Button, InputGroup, Form } from "react-bootstrap"
import { Trash } from "react-bootstrap-icons"

export default function ProductItem({
  id,
  name,
  price,
  image,
  quantity,
  onDelete = () => {},
  onQuantityChange = () => {},
}) {

  const [quantity1, setQuantity1] = useState(Number(quantity))
  const parsedPrice = parseFloat(price) || 0
  const [gia, setGia] = useState(parsedPrice * quantity1)

  const updateOrderInLocalStorage = (updatedQuantity) => {
    // Lấy thông tin đơn hàng hiện tại từ localStorage
    const username = localStorage.getItem("username");
    if (!username) return;

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrder = orders.find(order => order.customer === username);    
    
    if (userOrder) {
      // Cập nhật số lượng của sản phẩm trong đơn hàng
      const updatedItems = userOrder.item.map(item =>
        item.item_id === id
          ? { ...item, quantity: updatedQuantity }
          : item
      );
      
      // Lưu lại đơn hàng với số lượng đã được cập nhật
      userOrder.item = updatedItems;
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }

  const updateOrderOnServer = async (updatedQuantity) => {
    const username = localStorage.getItem("username");
    if (!username) return;
  
    try {
      const response = await fetch("http://localhost:3001/api/orders/update-quantity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          item_id: id,
          newQuantity: updatedQuantity
        })
      });
  
      const result = await response.json();
      if (!result.success) {
        console.error("Lỗi cập nhật:", result.message);
      }
    } catch (error) {
      console.error("Lỗi kết nối server:", error);
    }
  }

  const handleIncrease = () => {
    const newQuantity = quantity1 + 1
    setQuantity1(newQuantity)
    setGia(parsedPrice * newQuantity)
    updateOrderInLocalStorage(newQuantity)
    updateOrderOnServer(newQuantity)
    onQuantityChange(id, newQuantity)
  }

  const handleDecrease = () => {
    if (quantity1 > 1) {
      const newQuantity = quantity1 - 1
      setQuantity1(newQuantity)
      setGia(parsedPrice * newQuantity)
      updateOrderInLocalStorage(newQuantity)
      updateOrderOnServer(newQuantity)
      onQuantityChange(id, newQuantity)
    }
  }

  const handleDelete = () => {
    onDelete(id)
  }

  return (
    <Row className="align-items-center mb-3 p-3 border rounded">
      {/* Hình ảnh hàng hóa bên trái */}
      <Col xs={3} md={2}>
        <Image src={image} alt={name} fluid thumbnail style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
      </Col>

      {/* Tên hàng hóa */}
      <Col xs={9} md={3} className="fw-bold">
        {name}
      </Col>

      <Col xs={6} md={2} className="text-danger fw-bold">
        {gia.toString()},000 đ
      </Col>

      {/* Số lượng có thể tăng giảm */}
      <Col xs={6} md={3} className="mt-2 mt-md-0">
        <InputGroup>
          <Button variant="outline-secondary" onClick={handleDecrease} disabled={quantity1 <= 1}>
            -
          </Button>
          <Form.Control value={quantity1} readOnly className="text-center" />
          <Button variant="outline-secondary" onClick={handleIncrease}>
            +
          </Button>
        </InputGroup>
      </Col>

      {/* Nút xóa với biểu tượng thùng rác và nền đỏ */}
      <Col xs={6} md={2} className="text-end mt-2 mt-md-0">
        <Button variant="danger" onClick={handleDelete} className="w-100">
          <Trash size={20} />
        </Button>
      </Col>
    </Row>
  )
}
