"use client"

import { useState } from "react"
import { Row, Col, Image, Button, InputGroup, Form } from "react-bootstrap"
import { Trash } from "react-bootstrap-icons"

export default function ProductItem({
  id,
  name,
  image,
  price,
  initialQuantity = 1,
  onDelete = () => {},
  onQuantityChange = () => {},
}) {
  const [quantity, setQuantity] = useState(initialQuantity)

  const handleIncrease = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    onQuantityChange(id, newQuantity)
    console.log(quantity);
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onQuantityChange(id, newQuantity)
      console.log(quantity);
      
    }
  }

  const handleDelete = () => {
    onDelete(id)
  }

  return (
    <Row className="align-items-center mb-3 p-3 border rounded">
      {/* Hình ảnh hàng hóa bên trái */}
      <Col xs={3} md={2}>
        <Image src={image} alt={name} fluid thumbnail style={{ width: '80px', height: '80px', objectFit: 'cover' }}/>
      </Col>

      {/* Tên hàng hóa */}
      <Col xs={9} md={3} className="fw-bold">
        {name}
      </Col>

      <Col xs={6} md={2} className="text-danger fw-bold">
        {price} đ
      </Col>

      {/* Số lượng có thể tăng giảm */}
      <Col xs={6} md={3} className="mt-2 mt-md-0">
        <InputGroup>
          <Button variant="outline-secondary" onClick={handleDecrease} disabled={quantity <= 1}>
            -
          </Button>
          <Form.Control value={quantity} readOnly className="text-center" />
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
