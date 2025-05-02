import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react"
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap"
import data from "../../data/simplified_json_generated_data_vn_units.json"
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom"

export default function Signup() {
    const [formData, setFormData] = useState({
        tendn: "",
        matkhau: "",
        hoten: "",
        ngaysinh: "",
        sdt: "",
        email: "",
        soNha: "",
        duong: "",
        phuongxa: "",
        quanhuyen: "",
        thanhpho: "",
        gioitinh: "Nam",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    useEffect(() => {
        setProvinces(data);
    }, []);

    const handleProvinceChange = (e) => {
        const provinceCode = e.target.value;
        setSelectedProvince(provinceCode);
        const selected = data.find(p => p.Code === provinceCode);
        setDistricts(selected.District || []);
        setWards([]);
        setSelectedDistrict('');
    };

    const handleDistrictChange = (e) => {
        const districtCode = e.target.value;
        setSelectedDistrict(districtCode);
        const selectedDistrict = districts.find(d => d.Code === districtCode);
        setWards(selectedDistrict ? selectedDistrict.Ward : []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Tìm tên đầy đủ của tỉnh, huyện, xã từ mã đã chọn
        const selectedProvinceObj = provinces.find(p => p.Code === selectedProvince);
        const selectedDistrictObj = districts.find(d => d.Code === selectedDistrict);
        const selectedWardObj = wards.find(w => w.Code === formData.phuongxa);


        // Tạo object hoàn chỉnh với địa chỉ rõ ràng
        const fullFormData = {
            ...formData,
            thanhpho: selectedProvinceObj ? selectedProvinceObj.Name : "",
            quanhuyen: selectedDistrictObj ? selectedDistrictObj.Name : "",
            phuongxa: selectedWardObj ? selectedWardObj.Name : "",
            quyen: "user",
            ngaytao: new Date().toISOString().split("T")[0], // định dạng YYYY-MM-DD
            trangthai: "active"
        };

        try {
            const response = await fetch("https://67cd3719dd7651e464edabb9.mockapi.io/account", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fullFormData)
            });

            if (!response.ok) {
                throw new Error("Lỗi khi gửi dữ liệu lên máy chủ.");
            }

            const userData = await response.json(); // trả về thông tin người dùng vừa tạo

            // ✅ Tạo giỏ hàng rỗng cho người dùng vừa đăng ký
            const cart = {
                customer: userData.tendn, // tên đăng nhập vừa tạo
                item: [] // mảng sản phẩm rỗng
            };

            const cartRes = await fetch("https://67cd3719dd7651e464edabb9.mockapi.io/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cart)
            });

            if (!cartRes.ok) {
                throw new Error("Lỗi khi tạo giỏ hàng.");
            }
            alert("Đăng ký thành công");
            navigate("/login");
        } catch (error) {
            console.error("Lỗi đăng ký:", error);
            alert("Đăng ký thất bại. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="container-fluid">
                <div className="header">
                    <Header />
                </div>
                <div className="content" style={{ marginTop: "100px" }}>
                    <Container className="py-5">
                        <Row className="justify-content-center">
                            <Col lg={10}>
                                <Card className="shadow">
                                    <Card.Header className="bg-white">
                                        <h2 className="mb-0">Đăng Ký Tài Khoản</h2>
                                        <p className="text-muted">Vui lòng điền đầy đủ thông tin để đăng ký tài khoản mới</p>
                                    </Card.Header>

                                    <Card.Body>
                                        <Form onSubmit={handleSubmit}>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Tên đăng nhập</Form.Label>
                                                        <Form.Control type="text" name="tendn" value={formData.tendn} onChange={handleChange} required />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Mật khẩu</Form.Label>
                                                        <Form.Control
                                                            type="password"
                                                            name="matkhau"
                                                            value={formData.matkhau}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Họ tên</Form.Label>
                                                        <Form.Control type="text" name="hoten" value={formData.hoten} onChange={handleChange} required />
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
                                                            required
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Số điện thoại</Form.Label>
                                                        <Form.Control type="text" name="sdt" value={formData.sdt} onChange={handleChange} required />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Số nhà</Form.Label>
                                                        <Form.Control type="text" name="soNha" value={formData.soNha} onChange={handleChange} required />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Đường</Form.Label>
                                                        <Form.Control type="text" name="duong" value={formData.duong} onChange={handleChange} required />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Phường/Xã</Form.Label>
                                                        <Form.Select name="phuongxa" value={formData.phuongxa} onChange={handleChange}>
                                                            <option value="">Chọn phường/xã</option>
                                                            {wards.map(ward => (
                                                                <option key={ward.Code} value={ward.Code} style={{ color: 'black' }}>{ward.Name}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Quận/Huyện</Form.Label>
                                                        <Form.Select name="quanhuyen" value={selectedDistrict} onChange={handleDistrictChange}>
                                                            <option value="">Chọn quận/huyện</option>
                                                            {Array.isArray(districts) &&
                                                                districts
                                                                    .slice() // tránh làm thay đổi mảng gốc trong state
                                                                    .sort((a, b) => a.Name.localeCompare(b.Name, 'vi', { sensitivity: 'base' }))
                                                                    .map(district => (
                                                                        <option key={district.Code} value={district.Code}>{district.Name}</option>
                                                                    ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Thành phố</Form.Label>
                                                        <Form.Select name="thanhpho" value={selectedProvince} onChange={handleProvinceChange}>
                                                            <option value="" style={{ color: 'black' }}>Chọn tỉnh/thành</option>
                                                            {provinces.map(province => (
                                                                <option key={province.Code} value={province.Code} style={{ color: 'black' }}>{province.Name}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Giới tính</Form.Label>
                                                        <Form.Select name="gioitinh" value={formData.gioitinh} onChange={handleChange}>
                                                            <option value="Nam">Nam</option>
                                                            <option value="Nữ">Nữ</option>
                                                            <option value="Khác">Khác</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <div className="d-flex justify-content-between mt-4">
                                                <Link to="/">
                                                    <Button variant="secondary">Hủy</Button>
                                                </Link>

                                                <Button type="submit" variant="primary" disabled={loading}>
                                                    {loading ? "Đang xử lý..." : "Đăng Ký"}
                                                </Button>
                                            </div>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </div>
        </>
    )
}
