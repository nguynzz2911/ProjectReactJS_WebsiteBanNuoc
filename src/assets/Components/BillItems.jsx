import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Eye } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

export default function BillItems({ id, customer, time, date, total, item}) {
  const [itemsInfo, setItemsInfo] = useState([]);
  const navigate = useNavigate();

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

      <Col xs={9} md={7} className="fw-bold">
        {itemsInfo.map((i, index) => (
            <Link
            to={`/detail/${i.id}`}
            state={{ drink: i }}
            style={{ textDecoration: "none" }}
            key={index}
          >
            <div>
              {i.name} ({i.price}) x{i.quantity}
            </div>
          </Link>
        ))}
      </Col>

      <Col xs={6} md={3} className="text-danger fw-bold">
        Tổng tiền: {total.toString()},000 đ
      </Col>
{/* 
      <Col xs={6} md={2} className="text-end mt-2 mt-md-0">
        <Button variant="success">
          <Eye />
        </Button>
      </Col> */}
    </Row>
  );
}
