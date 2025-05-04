import { React, useState, useEffect, use } from 'react'
import { CiImport } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { PiLessThan } from "react-icons/pi";
import { PiGreaterThan } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import "../CSS/Customer.css";

export default function Customer() {
  const [data, setData] = useState([]);
  useEffect(() => {

    fetch('https://67cd3719dd7651e464edabb9.mockapi.io/account')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  const getStatusBadge = (status) => {
    let className = "status-badge ";
    switch (status) {
      case "admin":
        className += "bg-success text-white";
        break;
      default:
        className += "bg-warning text-white";
    }
    return <span className={className}>{status}</span>;
  };

  return (
    <>
      <div className="container-detailed-report">
        <div className="header-detailed-report">
          <div className="logo-detailed-report">
            Dữ liệu khách hàng
          </div>
          <div className="button-ex-im">
            <button className="button-import">
              <FaRegUserCircle /> Thêm người dùng
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
                <th>TÊN ĐĂNG NHẬP</th>
                <th>HỌ TÊN</th>
                <th>SỐ ĐIỆN THOẠI</th>
                <th>EMAIL</th>
                <th>QUYỀN</th>
                <th style={{ textAlign: "center" }}>STATUS</th>
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
                    {user.tendn}
                  </td>
                  <td>{user.hoten}</td>
                  <td>{user.sdt}</td>
                  <td>{user.email}</td>
                  <td style={{ textAlign: "center" }}>
                    {getStatusBadge(user.quyen)}
                  </td>
                  <td>
                    <button>
                      <GoPencil />
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
    </>
  )
}
