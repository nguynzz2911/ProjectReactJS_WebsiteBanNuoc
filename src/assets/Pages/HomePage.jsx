import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import "../CSS/Home.css"
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Anh1 from "../../images/douonghot/traolong.png"
import Anh2 from "../../images/douonghot/batbao.png"
import Anh3 from "../../images/douonghot/batbaochua.png"
import Anh4 from "../../images/douonghot/hongtra.png"
import MyCarosel from '../Components/MyCarosel';
import Card from '../Components/CardAboutUs';

export default function Home() {
  const img = [Anh1, Anh2, Anh3, Anh4]
  const mau1 = ["#0a7eb4", "#07628c", "#054867", "#a6b1bb"]
  const mau = ["#086a9e", "#065279", "#04394f", "#8f99a3"]
  const [so, setSo] = useState(0);
  const [nen1, setNen1] = useState(mau1[0]);
  const [nen2, setNen2] = useState(mau1[1]);
  const [nen3, setNen3] = useState(mau1[2]);
  const [nen4, setNen4] = useState(mau1[3]);

  return (
    <>
        <div className="container-fluid">
          {/* <div className="header" style={{position: "sticky", top: 0, zIndex: 1000}}> */}
          <div className="header">
            <Header></Header>
          </div>
          <div className="content">
            {/* <div style={{position: "sticky", top: 10, zIndex: 10, marginTop: "100px"}}>  */}
            <div style={{marginBottom: "100px", marginTop: "150px"}}> 
              <MyCarosel></MyCarosel>
            </div>
            {/* <div style={{position: "sticky", top: 10, zIndex: 10, padding: "20px"}} className='div2'> */}
            <div className='div2' style={{padding: "0px 100px"}}>
              <h1 className="hot" style={{textAlign: "center", marginBottom: "100px"}}>
                Đồ uống hot
              </h1>
              <div className="doUongHot row">
                <div className="col" style={{display:'flex', justifyContent:'center', alignItems:"center"}}>
                  <img src={img[so]} alt="" style={{width: '100%', height: 'auto', border: "2px solid grey", borderRadius: "5%"}}/>
                </div>
                <div className="col">
                  <div className="row mon mon1" onMouseOver={() => {setSo(0), setNen1(mau[0])}} onMouseLeave={() => setNen1(mau1[0])} style={{backgroundColor: `${nen1}`}}>
                    <h2 className='monTitle'>Trà ô long bí đao</h2>
                  </div>
                  <div className="row mon mon2" onMouseOver={() => {setSo(1), setNen2(mau[1])}} onMouseLeave={() => setNen2(mau1[1])} style={{backgroundColor: `${nen2}`}}>
                    <h2 className='monTitle'>Trà bát bảo ngọt</h2>
                  </div>
                  <div className="row mon mon3" onMouseOver={() => {setSo(2), setNen3(mau[2])}} onMouseLeave={() => setNen3(mau1[2])} style={{backgroundColor: `${nen3}`}}>
                    <h2 className='monTitle'>Trà bát bảo chua</h2>
                  </div>
                  <div className="row mon mon4" onMouseOver={() => {setSo(3), setNen4(mau[3])}} onMouseLeave={() => setNen4(mau1[3])} style={{backgroundColor: `${nen4}`}}>
                    <h2 className='monTitle'>Hồng trà kem tươi</h2>
                  </div>
                </div>
              </div>
              <div className="nutXemThem" style={{display:'flex', justifyContent:'center', alignItems:"center"}}>
                <Link to={"/menu"}><Button className='my-5 btn-tatca' style={{color: "white", borderRadius: "20px", fontSize: 20, fontWeight: "bold"}}>Xem tất cả</Button></Link>
              </div>
            </div>
            <h1 className="hot" style={{textAlign: "center", marginBottom: "50px", marginTop: "50px"}}>
                Về chúng tôi
            </h1>
            <Link to={"/about"}>
              <div style={{position: "sticky", top: 10, zIndex: 10, display:'flex', justifyContent:'center', alignItems:"center", padding: "0px 300px"}}>
                <Card></Card>
              </div>
            </Link>
          </div>
          <div className="footer">
            <Footer></Footer>
          </div>
        </div>
    </>
  )
}
