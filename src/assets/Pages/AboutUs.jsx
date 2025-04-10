import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import CardAboutUs from '../Components/CardAboutUs'
import Logo from "../../images/logo.png"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AboutUs() {
  return (
    <>
      <div className="container-fluid">
        <div className="header">
          <Header></Header>
        </div>
      <div className="content" style={{marginTop: "150px" }}>
        <div className="gioiThieu" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div className="logo" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <img src={Logo} alt="logo" style={{ width: "20%" }} />
          </div>
        </div>
        <h1 style={{textAlign: "center", fontWeight: "bold", color: "#155fc0", marginBottom: "100px", marginTop: "20px"}}>ĐỒ UỐNG SV - DÀNH CHO SINH VIÊN</h1>
        <div className="title my-5">
          <h2 className='my-4' style={{color: "#155fc0"}}>Đồ uống SV là nơi cung cấp những đồ uống ngon với giá cả phải chăng,</h2>
          <h2 className='my-4' style={{color: "#155fc0"}}>giao hàng tận nơi, cam kết chất lượng tốt nhất dành cho khách hàng.</h2>
        </div>
        <div className="team" style={{marginTop: "100px", marginBottom: "100px", padding: "0px 300px"}}>
          <h1 className="hot" style={{textAlign: "center", marginBottom: "50px"}}>
            Đội ngũ của chúng tôi
          </h1>
          <CardAboutUs></CardAboutUs>
        </div>
      </div>
        <div className="footer">
          <Footer></Footer>
        </div>
      </div>
    </>
  )
}
