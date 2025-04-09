import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../CSS/Home.css"
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Anh1 from "../../images/douonghot/traolong.png"
import Anh2 from "../../images/douonghot/batbao.png"
import Anh3 from "../../images/douonghot/batbaochua.png"
import Anh4 from "../../images/douonghot/hongtra.png"
import MyCarosel from '../Components/MyCarosel';

export default function Home() {
  const img = [Anh1, Anh2, Anh3, Anh4]
  const [so, setSo] = useState(0);

  return (
    <>
        <div className="container-fluid">
          <div className="header" style={{position: "sticky", top: "0", zIndex: "1000"}}>
            <Header></Header>
          </div>
          <div className="content">
            <div style={{position: "sticky", top: 10, zIndex: 10, marginTop: "100px"}}> 
              <MyCarosel></MyCarosel>
            </div>
            <div style={{position: "sticky", top: 80, zIndex: 10, marginTop: "100px", padding:'50px 200px'}} className='div2'>
              <h1 className="hot" style={{textAlign: "center", marginBottom: "80px"}}>
                Đồ uống hot
              </h1>
              <div className="doUongHot row">
                <div className="col" style={{display:'flex', justifyContent:'center', alignItems:"center"}}>
                  <img src={img[so]} alt="" style={{width: '100%', height: 'auto'}}/>
                </div>
                <div className="col">
                  <div className="row mon mon1" onMouseOver={() => setSo(0)} style={{backgroundColor: "#0a7eb4"}}>
                    <h2 className='monTitle'>Trà ô long bí đao</h2>
                  </div>
                  <div className="row mon mon2" onMouseOver={() => setSo(1)} style={{backgroundColor: "#07628c"}}>
                    <h2 className='monTitle'>Trà bát bảo ngọt</h2>
                  </div>
                  <div className="row mon mon3" onMouseOver={() => setSo(2)} style={{backgroundColor: "#054867"}}>
                    <h2 className='monTitle'>Trà bát bảo chua</h2>
                  </div>
                  <div className="row mon mon4" onMouseOver={() => setSo(3)} style={{backgroundColor: "#a6b1bb"}}>
                    <h2 className='monTitle'>Hồng trà kem tươi</h2>
                  </div>
                </div>
              </div>
            </div>
            {/* <div style={{position: "sticky", top: 100, zIndex: 10}}>
              <img src={Anh3} alt="" className="img-fluid"/>
            </div> */}
          </div>
          <div className="footer">
            <Footer></Footer>
          </div>
        </div>
    </>
  )
}
