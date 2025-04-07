import React from 'react'
import "../CSS/Header.css"
import Logo from "../../images/logo.png"
import Account from "../../images/account.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from "../../images/cart.png"
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <>
        <div className="container-fluid row">
          <div className="col" style={{display:'flex', justifyContent:'center', alignItems:"center"}}>
            <button className='btn'>Trang chủ</button>
          </div>
          <div className="col"  style={{display:'flex', justifyContent:'center', alignItems:"center"}}>
            <button className='btn'>Menu</button>
          </div>
          <div className="col"  style={{display:'flex', justifyContent:'center', alignItems:"center"}}>
            <button className='btn'>Giới thiệu</button>
          </div>
          <div className="col"  style={{overflow: "hidden", display:'flex', justifyContent:'center', alignItems:"center"}}>
            <img src={Logo} alt="" style={{objectFit:'cover', borderRadius:"10px"}} className='img-fluid logo'/>
          </div>   
          <div className="col"  style={{overflow: "hidden", display:'flex', justifyContent:'center', alignItems:"center"}}>
            <button className='btn'>Tin tức</button>
          </div>
          <div className="col" style={{display:'flex', justifyContent:'center', alignItems:"center"}}>
            <button style={{overflow: "hidden", display:'flex', justifyContent:'center', alignItems:"center"}} className='btn'>
              Giỏ hàng
              <img src={Cart} alt="" style={{width:"20%", height:"auto", marginLeft:'20px'}} className='img-fluid'/>
            </button>
          </div>
          <div className="col" style={{display:'flex', justifyContent:'center', alignItems:"center"}}>
            <img src={Account} alt="" className='img-fluid' style={{width:"30%", height:"auto"}}/>
          </div>
        </div> 
    </>
  )
}
