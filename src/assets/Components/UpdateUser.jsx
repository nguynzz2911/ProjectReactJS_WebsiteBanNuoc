import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "../../data/simplified_json_generated_data_vn_units.json"

const UpdateUser = ({ show, handleClose, username, onSuccess }) => {
    const [selectedWard, setSelectedWard] = useState('');
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        tendn: "",
        matkhau: "",
        hoten: "",
        ngaysinh: "",
        sdt: "",
        quyen: "",
        email: "",
        soNha: "",
        duong: "",
        phuongxa: "",
        quanhuyen: "",
        thanhpho: "",
        gioitinh: "",
    });
    useEffect(() => {
        setProvinces(data);
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [userId, setUserId] = useState('');
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        setProvinces(data);
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch('https://67cd3719dd7651e464edabb9.mockapi.io/account');
                const data = await res.json();
                const found = data.find(u => u.tendn === username);
    
                if (found) {
                    setUser(found);
                    setUserId(found.id);
    
                    setFormData(prev => ({
                        ...prev,
                        tendn: found.tendn || "",
                        matkhau: found.matkhau || "",
                        hoten: found.hoten || "",
                        ngaysinh: found.ngaysinh || "",
                        sdt: found.sdt || "",
                        quyen: found.quyen || "user",
                        email: found.email || "",
                        soNha: found.sonha || "",
                        duong: found.duong || "",
                        phuongxa: found.phuongxa,
                        quanhuyen: found.quanhuyen,
                        thanhpho: found.thanhpho,
                        gioitinh: found.gioitinh || "Nam",
                    }));
    
                    const province = provinces.find(p => p.Name === found.thanhpho);
                    if (province) {
                        setSelectedProvince(province.Code);
                        setDistricts(province.District || []);
                    }
    
                    const district = province?.District.find(d => d.Name === found.quanhuyen);
                    if (district) {
                        setSelectedDistrict(district.Code);
                        setWards(district.Ward || []);
                    }
    
                    const ward = district?.Ward.find(w => w.Name === found.phuongxa);
                    if (ward) {
                        setSelectedWard(ward.Code);
                    }
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu người dùng:", error);
            }
        };
    
        fetchUserData();
    }, [username, provinces]);
    
    const handleDistrictChange = (e) => {
        const districtCode = e.target.value;
        setSelectedDistrict(districtCode);

        const selectedDistrict = districts.find(d => d.Code === districtCode);
        const wardsList = selectedDistrict ? selectedDistrict.Ward : [];

        setWards(wardsList);
        setFormData(prev => ({
            ...prev,
            quanhuyen: selectedDistrict?.Name || "",
            phuongxa: "" // reset phường/xã khi đổi huyện
        }));
    };


    const handleProvinceChange = (e) => {
        const provinceCode = e.target.value;
        setSelectedProvince(provinceCode);

        const selected = data.find(p => p.Code === provinceCode);
        const districtList = selected?.District || [];

        setDistricts(districtList);
        setWards([]);
        setSelectedDistrict('');

        setFormData(prev => ({
            ...prev,
            thanhpho: selected?.Name || "",
            quanhuyen: "",
            phuongxa: ""
        }));
    };


    const handlePhuongChange = (e) => {
        const wardCode = e.target.value;
        setSelectedWard(wardCode);
        const selectedWardName = wards.find(w => w.Code === wardCode)?.Name || ""; // Tìm tên phường/xã từ mã đã chọn
        setFormData(prev => ({ ...prev, phuongxa: selectedWardName })); // ✅ Cập nhật bằng tên phường/xã
    };


    const handleSubmit = async () => {
        setLoading(true);

        const usernameRegex = /^\S+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
        const phoneRegex = /^0\d{9}$/;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const today = new Date();
        const dob = new Date(formData.ngaysinh);
        const age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();

        if (!usernameRegex.test(formData.tendn)) {
            alert("Tên đăng nhập không được chứa khoảng trắng.");
            setLoading(false);
            return;
        }

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
        if (!formData.quyen) {
            alert("Vui lòng chọn quyền.");
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
        if (!selectedProvince) {
            alert("Vui lòng chọn Tỉnh/Thành phố.");
            setLoading(false);
            return;
        }
        if (!selectedDistrict) {
            alert("Vui lòng chọn Quận/Huyện.");
            setLoading(false);
            return;
        }

        if (!formData.phuongxa) {
            alert("Vui lòng chọn Phường/Xã.");
            setLoading(false);
            return;
        }
        // Tìm tên đầy đủ của tỉnh, huyện, xã từ mã đã chọn
        const selectedProvinceObj = provinces.find(p => p.Code === selectedProvince);
        const selectedDistrictObj = districts.find(d => d.Code === selectedDistrict);
        const selectedWardObj = wards.find(w => w.Code === selectedWard);


        // Tạo object hoàn chỉnh với địa chỉ rõ ràng
        const fullFormData = {
            ...formData,
            thanhpho: selectedProvinceObj ? selectedProvinceObj.Name : "",
            quanhuyen: selectedDistrictObj ? selectedDistrictObj.Name : "",
            phuongxa: selectedWardObj ? selectedWardObj.Name : "",
            ngaytao: new Date().toISOString().split("T")[0], // định dạng YYYY-MM-DD
            trangthai: "active"
        };

        try {
            const response = await fetch(`https://67cd3719dd7651e464edabb9.mockapi.io/account/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fullFormData)
            });

            if (!response.ok) {
                throw new Error("Lỗi khi gửi dữ liệu lên máy chủ.");
            }
            onSuccess();
        } catch (error) {
            console.error("Lỗi thêm:", error);
            alert("Thêm thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật thông tin người dùng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
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
                                <Form.Label>Quyền</Form.Label>
                                <Form.Select name="quyen" value={formData.quyen} onChange={handleChange}>
                                    <option value="">Chọn quyền</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </Form.Select>
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
                                <Form.Select name="phuongxa" value={selectedWard} onChange={handlePhuongChange}>
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

                </Form>
            </Modal.Body>
            <Modal.Footer onSubmit={handleSubmit}>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={() => { handleSubmit(); }} >
                    Cập nhật
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateUser;