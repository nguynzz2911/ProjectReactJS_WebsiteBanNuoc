"use client"

import { useState, useEffect } from "react"
import { Row, Col, Image, Button, InputGroup, Form } from "react-bootstrap"
import { Trash } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"

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
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [data1, setData1] = useState([])

    useEffect(() => {
      const username = localStorage.getItem("username");
      if (!username) return;
    
      fetch('https://67cd3719dd7651e464edabb9.mockapi.io/order')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }, []);

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

  const updateOrderOnServerAPI = async (updatedQuantity) => {
    const username = localStorage.getItem("username");
    if (!username) return;
  
    try {
      const response = await fetch("https://67cd3719dd7651e464edabb9.mockapi.io/order", {
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

  // const handleDelete = async (id) => {
  //   const username = localStorage.getItem("username");
  
  //   // Gọi API xoá bên server
  //   await fetch('http://localhost:3001/api/orders/delete-item', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ username, itemId: id })
  //   });
  //   onDelete(id)
  // };

  const handleDelete = async (id) => {
    if (!id) return;
    const username = localStorage.getItem("username");
    const userOrder = data.find(order => order.customer === username);
    const orderId = userOrder ? userOrder.id : null;
    if (!orderId) return;
    try {
      const res = await fetch(`https://67cd3719dd7651e464edabb9.mockapi.io/order/${orderId}`); // Updated to use orderId instead of id
      const order = await res.json();

      const updatedItems = order.item.filter(item => item.item_id !== id);

      await fetch(`https://67cd3719dd7651e464edabb9.mockapi.io/order/${orderId}`, { // Updated to use orderId instead of id
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...order, item: updatedItems })
      });
      onDelete(id); // Call the onDelete function passed as a prop
      // setCart(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Xóa sản phẩm thất bại:", error);
    }
  };

  const handleQuantityChange = async (id, newQuantity) => {
    if (!id) return;
    const username = localStorage.getItem("username");
    const userOrder = data.find(order => order.customer === username);
    const orderId = userOrder ? userOrder.id : null;
    if (!orderId) return;
    try {
      const res = await fetch(`https://67cd3719dd7651e464edabb9.mockapi.io/order/${orderId}`); // Updated to use orderId instead of id
      const order = await res.json();

      const updatedItems = order.item.map(item =>
        item.item_id === id ? { ...item, quantity: newQuantity } : item
      );

      await fetch(`https://67cd3719dd7651e464edabb9.mockapi.io/order/${orderId}`, { // Updated to use orderId instead of id
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...order, item: updatedItems })
      });

      onQuantityChange(id, newQuantity); // Call the onQuantityChange function passed as a prop
    } catch (error) {
      console.error("Cập nhật số lượng thất bại:", error);
    }
  };

  const handleIncrease = () => {
    const newQuantity = quantity1 + 1
    setQuantity1(newQuantity)
    setGia(parsedPrice * newQuantity)
    updateOrderInLocalStorage(newQuantity)
    // updateOrderOnServer(newQuantity)
    onQuantityChange(id, newQuantity)
    handleQuantityChange(id, newQuantity)
  }

  const handleDecrease = () => {
    if (quantity1 > 1) {
      const newQuantity = quantity1 - 1
      setQuantity1(newQuantity)
      setGia(parsedPrice * newQuantity)
      updateOrderInLocalStorage(newQuantity)
      // updateOrderOnServer(newQuantity)
      handleQuantityChange(id, newQuantity)
    }
  }

  useEffect(() => {
    const fetchDrink = async () => {
      try {
        const response = await fetch(`https://68144f46225ff1af16287876.mockapi.io/drinks`);
        const data = await response.json();
        setData1(data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      }
    }
    fetchDrink();
  }, [])

  const handleClick = (id) => {
    const drink = data1.find(drink => drink.id === id);
    navigate(`/detail/${drink.id}`, { state: { drink } });
  }

  return (
    <Row className="align-items-center mb-3 p-3 border rounded">
      {/* Hình ảnh hàng hóa bên trái */}
      <Col xs={3} md={2}  onClick={() => {handleClick(id)}}>
        <Image src={image} alt={name} fluid thumbnail style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
      </Col>

      {/* Tên hàng hóa */}
      <Col xs={9} md={3} className="fw-bold"   onClick={() => {handleClick(id)}}>
        {name}
      </Col>

      <Col xs={6} md={2} className="text-danger fw-bold"  onClick={() => {handleClick(id)}}>
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
        <Button variant="danger" onClick={() => handleDelete(id)} className="w-100">
          <Trash size={20} />
        </Button>
      </Col>
    </Row>
  )
}
