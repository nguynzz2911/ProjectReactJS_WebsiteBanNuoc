import React from 'react'
import "../CSS/Footer.css"
import FB from "../../images/fb.png"
import YT from "../../images/youtube.png"
import IG from "../../images/ig.png"
import Logo from "../../images/logo.png"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Footer() {
  return (
    <>
        <div className="container-fluid ctn row">
            <div className="foot1 col">
              <div className="foot1-up my-3" style={{overflow: "hidden", display:'flex', justifyContent:'center', alignItems:"center"}}>
                <img src={Logo} alt="" className='img-fluid logo' style={{objectFit:'cover', borderRadius:"10px"}}/>
              </div>
              <div className="foot1-down" style={{display:'flex', justifyContent:'center', alignItems:"center"}}>
                <a href="https://www.facebook.com/"><img className="icon" src={FB} alt="" /></a>
                <a href="https://youtu.be/q-Y0bnx6Ndw?feature=shared"><img className="icon" src={YT} alt="" /></a>
                <a href="https://www.instagram.com/"><img className="icon" src={IG} alt="" /></a>
              </div>
            </div>
            <div className="foot2 col">
              <h2 className='title my-5'>THÔNG TIN LIÊN HỆ</h2>
              <p className='para'>&bull;  Địa chỉ: <span style={{color:'yellow'}}>Số 12 Nguyễn Văn Bảo, Phường 1, Quận Gò Vấp, Thành phố Hồ Chí Minh</span></p>
              <p className='para'>&bull;  Điện thoại: <span style={{color:'yellow'}}>028 38940 390 - 100</span></p>
              <p className='para'>&bull;  Email: <span style={{color:'yellow'}}>dhcn@iuh.edu.vn</span></p>
            </div>
            <div className="foot3 col">
              
            </div>
        </div>
    </>
  )
}