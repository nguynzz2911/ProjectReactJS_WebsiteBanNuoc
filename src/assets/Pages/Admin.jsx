import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Modal } from 'react-bootstrap';


export default function Admin() {
  const [formData, setFormData] = useState({
    tendn: "",
    hoten: "",
    ngaysinh: "",
    sdt: "",
    email: "",
    soNha: "",
    duong: "",
    phuongxa: "",
    quanhuyen: "",
    thanhpho: "",
    gioitinh: "Nam"
  });

  const [originalData, setOriginalData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    const fetchUser = async () => {
      const username = localStorage.getItem("username");
      if (!username) return;

      try {
        const res = await fetch("https://67cd3719dd7651e464edabb9.mockapi.io/account");
        const data = await res.json();

        const currentUser = data.find(acc => acc.tendn === username);
        if (!currentUser) return;

        setFormData(currentUser);
        setOriginalData(currentUser);

        // Thiết lập quận và phường từ thông tin người dùng hiện tại
        const selectedProvince = currentUser.thanhpho;
        const selectedDistrict = currentUser.quanhuyen;
        const selectedWard = currentUser.phuongxa;

        const province = provinces.find(p => p.name === selectedProvince);
        if (province) {
          setDistricts(province.districts || []);
          const district = province.districts.find(d => d.name === selectedDistrict);
          if (district) {
            setWards(district.wards || []);
          }
        }

      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", err);
      }
    };

    fetchUser();
  }, [provinces]);  // Thêm dependencies là provinces để nó chạy lại khi danh sách tỉnh thay đổi



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    //Kiểm tra dữ liệu
    const phoneRegex = /^0\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const today = new Date();
    const dob = new Date(formData.ngaysinh);
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    if (!phoneRegex.test(formData.sdt)) {
      alert("Số điện thoại không hợp lệ.");
      setLoading(false);
      return;
    }


    if (!emailRegex.test(formData.email)) {
      alert("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
      setLoading(false);
      return;
    }


    if (
      dob > today ||
      age < 16 ||
      (age === 16 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
    ) {
      alert("Ngày sinh không hợp lệ. Người dùng phải đủ 16 tuổi.");
      setLoading(false);
      return;
    }


    if (!formData.hoten.trim()) {
      alert("Họ tên không được để trống.");
      setLoading(false);
      return;
    }


    if (!/^\d+$/.test(formData.soNha.trim())) {
      alert("Số nhà phải là số và không được để trống.");
      setLoading(false);
      return;
    }


    if (!formData.duong.trim()) {
      alert("Tên đường không được để trống.");
      setLoading(false);
      return;
    }


    if (!formData.thanhpho) {
      alert("Vui lòng chọn Tỉnh/Thành phố.");
      setLoading(false);
      return;
    }


    if (!formData.quanhuyen) {
      alert("Vui lòng chọn Quận/Huyện.");
      setLoading(false);
      return;
    }


    if (!formData.phuongxa) {
      alert("Vui lòng chọn Phường/Xã.");
      setLoading(false);
      return;
    }



    // Cập nhật thông tin người dùng
    try {
      const res = await fetch(`https://67cd3719dd7651e464edabb9.mockapi.io/account/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();
      setFormData(updated);
      setOriginalData(updated);
      setIsEditing(false);
      alert("Cập nhật thành công");
    } catch (err) {
      console.error(err);
      alert("Cập nhật thất bại");
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Mật khẩu không khớp!");
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      setPasswordError("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, số và ký tự đặc biệt.");
      return;
    }

    try {
      const updatedUser = { ...formData, matkhau: newPassword };

      const res = await fetch(`https://67cd3719dd7651e464edabb9.mockapi.io/account/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser)
      });

      if (!res.ok) throw new Error("Password update failed");

      alert("Mật khẩu đã được thay đổi!");
      setShowPasswordModal(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      alert("Đổi mật khẩu thất bại!");
    }
  };


  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordError("");
  };
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await fetch("https://provinces.open-api.vn/api/?depth=3");
        const data = await res.json();
        setProvinces(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách tỉnh:", error);
      }
    };
    fetchProvinces();
  }, []);
  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    const province = provinces.find(p => p.name === selectedProvince);
    setFormData(prev => ({
      ...prev,
      thanhpho: selectedProvince,
      quanhuyen: "",  // reset quận/huyện khi đổi thành phố
      phuongxa: ""    // reset phường/xã khi đổi thành phố
    }));
    setDistricts(province?.districts || []);
    setWards([]);  // Reset wards khi đổi thành phố
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    const district = districts.find(d => d.name === selectedDistrict);
    setFormData(prev => ({
      ...prev,
      quanhuyen: selectedDistrict,
      phuongxa: ""  // reset phường/xã khi đổi quận/huyện
    }));
    setWards(district?.wards || []);
  };

  const handleWardChange = (e) => {
    setFormData(prev => ({
      ...prev,
      phuongxa: e.target.value
    }));
  };


  return (
    <div className="container-fluid">
      <div className="header"><Header /></div>
      <Container style={{ paddingTop: '180px', minHeight: '100vh' }}>
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="shadow">
              <Card.Header className="bg-white">
                <h2>Thông Tin Cá Nhân</h2>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Họ tên</Form.Label>
                        <Form.Control
                          type="text"
                          name="hoten"
                          value={formData.hoten}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control
                          type="date"
                          name="ngaysinh"
                          value={formData.ngaysinh}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                          type="text"
                          name="sdt"
                          value={formData.sdt}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Giới tính</Form.Label>
                        <Form.Select
                          name="gioitinh"
                          value={formData.gioitinh}
                          onChange={handleChange}
                          disabled={!isEditing}
                        >
                          <option>Nam</option>
                          <option>Nữ</option>
                          <option>Khác</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Số nhà</Form.Label>
                        <Form.Control
                          type="text"
                          name="soNha"
                          value={formData.soNha}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Đường</Form.Label>
                        <Form.Control
                          type="text"
                          name="duong"
                          value={formData.duong}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Thành phố</Form.Label>
                        <Form.Select
                          name="thanhpho"
                          value={formData.thanhpho}
                          onChange={handleProvinceChange}
                          disabled={!isEditing}
                        >
                          <option value="">Chọn Tỉnh/Thành phố</option>
                          {provinces.map(p => (
                            <option key={p.code} value={p.name}>{p.name}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Quận / Huyện</Form.Label>
                        <Form.Select
                          name="quanhuyen"
                          value={formData.quanhuyen}
                          onChange={handleDistrictChange}
                          disabled={!isEditing || !formData.thanhpho}
                        >
                          <option value="">Chọn Quận/Huyện</option>
                          {districts.map(d => (
                            <option key={d.code} value={d.name}>{d.name}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phường / Xã</Form.Label>
                        <Form.Select
                          name="phuongxa"
                          value={formData.phuongxa}
                          onChange={handleWardChange}
                          disabled={!isEditing || !formData.quanhuyen}
                        >
                          <option value="">Chọn Phường/Xã</option>
                          {wards.map(w => (
                            <option key={w.code} value={w.name}>{w.name}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                    </Col>


                  </Row>

                  <div className="d-flex justify-content-between mt-4">
                    {!isEditing ? (
                      <>
                        <Button variant="primary" onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
                        <Button variant="warning" onClick={handlePasswordChange}>Đổi mật khẩu</Button>
                      </>
                    ) : (
                      <>
                        <Button variant="secondary" onClick={handleCancel}>Hủy</Button>
                        <Button variant="success" onClick={handleSave}>Lưu</Button>
                      </>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal
        show={showPasswordModal}
        onHide={handleClosePasswordModal}
        backdrop="static" // Đảm bảo lớp phủ không cho phép tương tác ngoài modal
        centered // Căn giữa modal trên màn hình
      >
        <Modal.Header closeButton>
          <Modal.Title>Đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Xác nhận mật khẩu</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            {passwordError && <div className="text-danger">{passwordError}</div>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePasswordModal}>Hủy</Button>
          <Button variant="primary" onClick={handlePasswordSubmit}>Lưu thay đổi</Button>
        </Modal.Footer>
      </Modal>

      <div className="footer"><Footer /></div>
    </div>
  );
}
