import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "../../data/simplified_json_generated_data_vn_units.json"

const UpdateUserInfoModal = ({ show, handleClose, userId, onSuccess }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        hoten: "",
        sdt: "",
        sonha: "",
        duong: "",
        phuongxa: "",
        quanhuyen: "",
        thanhpho: "",
        gioitinh: "Nam",
    });
    useEffect(() => {
        setProvinces(data);
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const username = localStorage.getItem("username");
                if (!username) return;
                fetch('https://67cd3719dd7651e464edabb9.mockapi.io/account')
                    .then(res => res.json())
                    .then(data => {
                        const found = data.find(u => u.tendn === username);
                        if (found) setUser(found);
                    })
                    .catch(err => console.error("Lỗi khi lấy thông tin user:", err));

                setFormData(prev => ({
                    ...prev,
                    hoten: user.hoten,
                    sdt: user.sdt,
                    sonha: user.sonha,
                    duong: user.duong,
                    phuongxa: user.phuongxa,
                    quanhuyen: user.quanhuyen,
                    thanhpho: user.thanhpho,
                    gioitinh: user.gioitinh,
                }));

                const selectedProvince = data.find(p => p.Name === user.thanhpho);
                if (selectedProvince) {
                    setSelectedProvince(selectedProvince.Code);
                    setDistricts(selectedProvince.District || []);

                    const selectedDistrict = selectedProvince.District.find(d => d.Name === user.quanhuyen);
                    if (selectedDistrict) {
                        setSelectedDistrict(selectedDistrict.Code);
                        setWards(selectedDistrict.Ward || []);

                        const selectedWard = selectedDistrict.Ward.find(w => w.Name === user.phuongxa);
                        if (selectedWard) {
                            setSelectedWard(selectedWard.Code);
                        }
                    }
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu người dùng:", error);
            }
        };

        fetchUserData();
    }, [userId]);



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


    const handleHoTenChange = (e) => {
        const hoten = e.target.value;
        setFormData(prevState => ({ ...prevState, hoten }));
    };

    const handleSDTChange = (e) => {
        const sdt = e.target.value;
        setFormData(prevState => ({ ...prevState, sdt }));
    };

    const handleSoNhaChange = (e) => {
        const sonha = e.target.value;
        setFormData(prevState => ({ ...prevState, sonha }));
    };

    const handleDuongChange = (e) => {
        const duong = e.target.value;
        setFormData(prevState => ({ ...prevState, duong }));
    };

    const handleSubmmit = async () => {
        const selectedProvinceObj = provinces.find(p => p.Code === selectedProvince);
        const selectedDistrictObj = districts.find(d => d.Code === selectedDistrict);
        const selectedWardObj = wards.find(w => w.Code === selectedWard);


        // Tạo object hoàn chỉnh với địa chỉ rõ ràng
        const fullFormData = {
            id: userId,
            thanhpho: selectedProvinceObj ? selectedProvinceObj.Name : "",
            quanhuyen: selectedDistrictObj ? selectedDistrictObj.Name : "",
            phuongxa: selectedWardObj ? selectedWardObj.Name : "",
            sonha: formData.sonha,
            duong: formData.duong,
            hoten: formData.hoten,
            sdt: formData.sdt
        };

        try {
            const response = await fetch(`https://67cd3719dd7651e464edabb9.mockapi.io/account/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fullFormData)
            });

            if (response.ok) {
                if (onSuccess) {
                    onSuccess(); // gọi callback để cha (CartFooter) fetch lại
                }
            } else {
                console.error("Cập nhật thất bại");
            }
            alert("Cập nhật thành công");
        } catch (error) {
            console.error("Lỗi cập nhật:", error);
            alert("Cập nhật thất bại. Vui lòng thử lại.");
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật thông tin người dùng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-2">
                        <Form.Label>Họ tên</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.hoten}
                            onChange={handleHoTenChange}
                            placeholder="Nhập họ tên"
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.sdt}
                            onChange={handleSDTChange}
                            placeholder="Nhập số điện thoại"
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Số nhà</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.sonha}
                            onChange={handleSoNhaChange}
                            placeholder="Nhập số nhà"
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Tên đường</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.duong}
                            onChange={handleDuongChange}
                            placeholder="Nhập đường"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Thành phố</Form.Label>
                        <Form.Select name="thanhpho" value={selectedProvince} onChange={handleProvinceChange}>
                            <option value="" style={{ color: 'black' }}>Chọn tỉnh/thành</option>
                            {provinces.map(province => (
                                <option key={province.Code} value={province.Code} style={{ color: 'black' }}>{province.Name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

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

                    <Form.Group className="mb-3">
                        <Form.Label>Phường/Xã</Form.Label>
                        <Form.Select name="phuongxa" value={selectedWard} onChange={handlePhuongChange}>
                            <option value="">Chọn phường/xã</option>
                            {wards.map(ward => (
                                <option key={ward.Code} value={ward.Code} style={{ color: 'black' }}>{ward.Name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={() => { handleSubmmit(); onSuccess(); }} >
                    Cập nhật
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateUserInfoModal;
