import { React, useState, useEffect, use } from 'react'
import { CiImport } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { PiLessThan } from "react-icons/pi";
import { PiGreaterThan } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import "../CSS/Customer.css";
import { FaTrash } from "react-icons/fa";
import { Modal, Button, Form } from 'react-bootstrap';
export default function News() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    date: "",
    description: "",
    content: "",
    image: ""
  });
    useEffect(() => {
  
      fetch('https://68145172225ff1af16287df4.mockapi.io/news')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }, []);
  
  
    const handleAddClick = () => {
      setFormData({ type: "", title: "", date: "", description: "", content: "", image: "" });
      setIsEditMode(false);
      setEditingId(null);
      setShowModal(true);
    };
  
    const handleEditClick = (item) => {
      console.log("Đang sửa item:", item); 
      setFormData({ ...item }); 
      setIsEditMode(true);
      setEditingId(String(item.id)); 
      setShowModal(true);
      console.log("ID cần chỉnh sửa:", item.id);

    };
    
  
    const handleDeleteClick = (id) => {
      if (window.confirm("Bạn có chắc chắn muốn xóa tin tức này?")) {
        fetch(`https://68145172225ff1af16287df4.mockapi.io/news/${id}`, {
          method: 'DELETE'
        })
          .then(() => {
            setData(prev => prev.filter(item => item.id !== id));
          })
          .catch(err => console.error("Lỗi khi xóa tin tức:", err));
      }
    };
  
    const handleSave = () => {
      const method = isEditMode ? 'PUT' : 'POST';
      const url = isEditMode
        ? `https://68145172225ff1af16287df4.mockapi.io/news/${editingId}`
        : 'https://68145172225ff1af16287df4.mockapi.io/news';
    
      const { id, ...dataWithoutId } = formData;
    
      fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataWithoutId)
      })
        .then(res => res.json())
        .then(result => {
          console.log("Kết quả trả về:", result);
          if (isEditMode) {
            setData(prev => prev.map(item => (String(item.id) === String(editingId) ? result : item)));
          } else {
            setData(prev => [...prev, result]);
          }
          setShowModal(false);
        })
        .catch(err => console.error("Lỗi khi lưu tin tức:", err));
    };
    
    
    
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const handleImageUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
    
      const cloudinaryData = new FormData();
      cloudinaryData.append("file", file);
      cloudinaryData.append("upload_preset", "newspage");
    
      setIsUploadingImage(true); // Bắt đầu upload
    
      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dqztqt7cs/image/upload", {
          method: "POST",
          body: cloudinaryData,
        });
    
        const data = await res.json();
        if (res.ok) {
          setFormData(prev => ({ ...prev, image: data.secure_url }));
        } else {
          console.error("Upload lỗi:", data.error.message);
        }
      } catch (error) {
        console.error("Lỗi khi upload:", error);
      } finally {
        setIsUploadingImage(false); // Upload xong
      }
    };
    
    
  return (
    <>
          <div className="container-detailed-report">
            <div className="header-detailed-report">
              <div className="logo-detailed-report">
                Tin tức
              </div>
              <div className="button-ex-im">
                <button className="button-import" onClick={handleAddClick}>
                  <FaRegUserCircle /> Thêm tin tức
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
                    <th>LOẠI</th>
                    <th>TIÊU ĐỀ</th>
                    <th>NGÀY ĐĂNG</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
  {data.map((user) => (
    <tr key={user.id}>
      <td><input type="checkbox" /></td>
      <td>{user.type}</td>
      <td>{user.title}</td>
      <td>{user.date}</td>
      <td>
        <button onClick={() => handleEditClick(user)}><GoPencil /></button>
        <button onClick={() => handleDeleteClick(user.id)} className="btn-delete" style={{ marginLeft: "8px" }}>
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
          <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Chỉnh sửa tin tức" : "Thêm tin tức"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3">
  <Form.Label>Loại</Form.Label>
  <Form.Select name="type" value={formData.type} onChange={handleChange}>
    <option value="">-- Chọn loại --</option>
    <option value="highlight">Highlight</option>
    <option value="new">New</option>
  </Form.Select>
</Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
  <Form.Label>Ngày đăng</Form.Label>
  <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
</Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control as="textarea" rows={2} name="description" value={formData.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control as="textarea" rows={3} name="content" value={formData.content} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
  <Form.Label>Chọn ảnh minh họa</Form.Label>
  <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
  {formData.image && (
    <img
      src={formData.image}
      alt="preview"
      style={{ width: "100px", marginTop: "10px", borderRadius: "8px" }}
    />
  )}
</Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Hủy</Button>
          <Button variant="primary" onClick={handleSave} disabled={isUploadingImage}>
  {isUploadingImage ? "Đang tải ảnh..." : "Lưu"}
</Button>

        </Modal.Footer>
      </Modal>
        </>
  )
}
