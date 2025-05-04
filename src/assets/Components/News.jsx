import { React, useState, useEffect, use } from 'react'
import { CiImport } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { PiLessThan } from "react-icons/pi";
import { PiGreaterThan } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import "../CSS/Customer.css";

export default function News() {
  const [data, setData] = useState([]);
    useEffect(() => {
  
      fetch('https://68145172225ff1af16287df4.mockapi.io/news')
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
                Tin tức
              </div>
              <div className="button-ex-im">
                <button className="button-import">
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
                  {data.map((user, index) => (
                    <tr key={index}>
                      <td>
                        <input type="checkbox" name="" id="" />
                      </td>
                      <td>
                        {user.type}
                      </td>
                      <td>{user.title}</td>
                      <td>{user.date}</td>
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
