import { React, useState, useEffect, use } from 'react'
import { CiImport } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { PiLessThan } from "react-icons/pi";
import { PiGreaterThan } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import "../CSS/Customer.css";

export default function Drinks() {
  const [data, setData] = useState([]);
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

  return (
    <>
      <div className="container-detailed-report">
        <div className="header-detailed-report">
          <div className="logo-detailed-report">
            Thức uống
          </div>
          <div className="button-ex-im">
            <button className="button-import">
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
