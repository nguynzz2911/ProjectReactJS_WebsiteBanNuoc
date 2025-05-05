import { React, useState, useEffect, use } from 'react'
import { CiImport } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { PiLessThan } from "react-icons/pi";
import { PiGreaterThan } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import "../CSS/Customer.css";
import { Modal, Button, Form } from 'react-bootstrap';
import { FaTrash } from "react-icons/fa";


export default function Drinks() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
const [editingId, setEditingId] = useState(null); // lưu ID món đang sửa

const [formData, setFormData] = useState({
  name: "",
  price: "",
  image: "",
  type: "",
  description: ""
});

  useEffect(() => {

    fetch('https://68144f46225ff1af16287876.mockapi.io/drinks')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  const getStatusBadge = (status) => {
    let className = "status-badge ";
    switch (status) {
      case "LOẠI THUẦN TRÀ":
        className += "bg-danger text-white";
        break;
      case "LOẠI TRÀ SỮA":
        className += "bg-warning text-dark";
        break;
      case "LOẠI TRÀ LATTE":
        className += "bg-success text-white";
        break;
      case "LOẠI TRÀ CHANH":
        className += "bg-primary text-white";
        break;
      default:
        className += "bg-secondary text-white";
    }
    return <span className={className}>{status}</span>;
  };
  const handleSaveDrink = () => {
    if (isEditMode) {
      // Chế độ sửa
      fetch(`https://68144f46225ff1af16287876.mockapi.io/drinks/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(res => res.json())
      .then(updatedDrink => {
        setData(prev =>
          prev.map(drink => (drink.id === editingId ? updatedDrink : drink))
        );
        setFormData({ name: "", price: "", image: "", type: "", description: "" });
        setIsEditMode(false);
        setEditingId(null);
        setShowModal(false);
      })
      .catch(err => console.error('Lỗi khi cập nhật thức uống:', err));
    } else {
      // Chế độ thêm mới
      fetch('https://68144f46225ff1af16287876.mockapi.io/drinks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(res => res.json())
      .then(data => {
        setData(prev => [...prev, data]);
        setFormData({ name: "", price: "", image: "", type: "", description: "" });
        setShowModal(false);
      })
      .catch(err => console.error('Lỗi khi thêm thức uống:', err));
    }
  };
  const handleEditDrink = (drink) => {
    setFormData({
      name: drink.name,
      price: drink.price,
      image: drink.image,
      type: drink.type,
      description: drink.description
    });
    setIsEditMode(true);
    setEditingId(drink.id);
    setShowModal(true);
  };
    
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadedUrl = await uploadImageToCloudinary(file);
      if (uploadedUrl) {
        setFormData(prev => ({ ...prev, image: uploadedUrl }));
      }
    }
  };
  
  const handleDeleteDrink = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thức uống này?")) {
      fetch(`https://68144f46225ff1af16287876.mockapi.io/drinks/${id}`, {
        method: 'DELETE'
      })
        .then(res => {
          if (!res.ok) throw new Error('Delete failed');
          // Xóa khỏi danh sách hiển thị
          setData(prev => prev.filter(drink => drink.id !== id));
        })
        .catch(err => console.error('Lỗi khi xóa thức uống:', err));
    }
  };
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "drinks"); // tên preset bạn đã tạo
  
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dqztqt7cs/image/upload", {
        method: "POST",
        body: formData,
      });
    
      const data = await res.json();
      console.log("Cloudinary response:", data); // 👈 Xem chi tiết lỗi tại đây
    
      if (res.ok) {
        return data.secure_url;
      } else {
        console.error("Upload failed:", data.error.message);
        return null;
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
    
  };
  
  return (
    <>
      <div className="container-detailed-report">
        <div className="header-detailed-report">
          <div className="logo-detailed-report">
            Thức uống
          </div>
          <div className="button-ex-im">
          <button
  className="button-import"
  onClick={() => {
    setFormData({ name: "", price: "", image: "", type: "", description: "" }); // reset form
    setIsEditMode(false); // đảm bảo là chế độ thêm
    setEditingId(null); // không có ID đang chỉnh sửa
    setShowModal(true);
  }}
>

              <FaRegUserCircle /> Thêm thức uống
            </button>
          </div>
        </div>
        <div className="main-detailed-report scroll-table-container">
          <table>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" name="" id="" />
                </th>
                <th>TÊN MÓN</th>
                <th>GIÁ TIỀN</th>
                <th style={{ textAlign: "center" }}>LOẠI</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" name="" id="" />
                  </td>
                  <td>
                    {user.name}
                  </td>
                  <td>{user.price}</td>
                  <td style={{ textAlign: "center" }}>
                    {getStatusBadge(user.type)} {/* Updated to use user.type */}
                  </td>
                  <td>
                    <button onClick={() => handleEditDrink(user)}>
                      <GoPencil />
                    </button>
                    <button onClick={() => handleDeleteDrink(user.id)} className="btn-delete" style={{ marginLeft: "8px" }}>
    <FaTrash />
  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="footer-detailed-report">
          <p>{data.length} kết quả</p>
        </div>
      </div>


      <Modal
  show={showModal}
  onHide={() => setShowModal(false)}
  backdrop="static"
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>{isEditMode ? "Chỉnh sửa thức uống" : "Thêm thức uống"}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Tên món</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Giá tiền</Form.Label>
        <Form.Control
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
  <Form.Label>Ảnh thức uống</Form.Label>
  <Form.Control
    type="file"
    accept="image/*"
    onChange={(e) => handleImageChange(e)}
  />
  {formData.image && (
    <img
      src={formData.image}
      alt="preview"
      style={{ width: "100px", marginTop: "10px", borderRadius: "8px" }}
    />
  )}
</Form.Group>


      <Form.Group className="mb-3">
        <Form.Label>Loại</Form.Label>
        <Form.Select
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="">-- Chọn loại --</option>
          <option value="LOẠI THUẦN TRÀ">LOẠI THUẦN TRÀ</option>
          <option value="LOẠI TRÀ SỮA">LOẠI TRÀ SỮA</option>
          <option value="LOẠI TRÀ LATTE">LOẠI TRÀ LATTE</option>
          <option value="LOẠI TRÀ CHANH">LOẠI TRÀ CHANH</option>
          <option value="LOẠI TRÀ TRÁI CÂY">LOẠI TRÀ TRÁI CÂY</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mô tả</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Hủy
    </Button>
    <Button variant="primary" onClick={handleSaveDrink}>
      Lưu thức uống
    </Button>
  </Modal.Footer>
</Modal>

    </>
  )
}
