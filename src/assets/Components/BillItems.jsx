import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Eye } from "react-bootstrap-icons";

export default function BillItems({ id, customer, time, date, total, item}) {
  const [itemsInfo, setItemsInfo] = useState([]);

  useEffect(() => {
    // Lấy thông tin tất cả drinks từ MockAPI
    fetch("https://68144f46225ff1af16287876.mockapi.io/drinks")
      .then(res => res.json())
      .then(data => {
        // Lọc và ghép thông tin drinks với đơn hàng
        const detailedItems = item.map(cartItem => {
          const product = data.find(d => d.id === cartItem.item_id);
          return product ? { ...product, quantity: cartItem.quantity } : null;
        }).filter(Boolean);
        setItemsInfo(detailedItems);
      });
  }, [item]);

  return (
    <Row className="align-items-center mb-3 p-3 border rounded">
      <Col xs={3} md={2}>
        <div className="ngay">
          {date}<br />
          <small>{time}</small>
        </div>
      </Col>

      <Col xs={9} md={5} className="fw-bold">
        {itemsInfo.map((i, index) => (
          <div key={index}>
            {i.name} ({i.price}) x{i.quantity}
          </div>
        ))}
      </Col>

      <Col xs={6} md={3} className="text-danger fw-bold">
        {total.toString()},000 đ
      </Col>

      <Col xs={6} md={2} className="text-end mt-2 mt-md-0">
        <Button variant="success">
          <Eye />
        </Button>
      </Col>
    </Row>
  );
}
