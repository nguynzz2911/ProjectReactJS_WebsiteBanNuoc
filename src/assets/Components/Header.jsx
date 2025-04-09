import React, { useEffect, useState } from 'react';
import "../CSS/Header.css"
import Logo from "../../images/logo.png"
import Account from "../../images/account.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from "../../images/cart.png"
import { Link } from 'react-router-dom'

export default function Header() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // cuộn xuống
        setShow(false);
      } else {
        // cuộn lên
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  return (
    <>
      <div className={`header-container sticky-top ${show ? 'show' : 'hide'}`}>
        <div className="container-fluid contn row ">
          <div className="col" style={{display:'flex', justifyContent:'center', alignItems:"center"}}>
            <Link to={`/`}><button className='btn'>Trang chủ</button></Link>
          </div>
          <div className="col"  style={{display:'flex', justifyContent:'center', alignItems:"center"}}>
          <Link to={`/menu`}><button className='btn'>Menu</button></Link>
          </div>
          <div className="col"  style={{display:'flex', justifyContent:'center', alignItems:"center"}}>
            <Link to={`/about`}><button className='btn'>Giới thiệu</button></Link>
          </div>
          <div className="col"  style={{overflow: "hidden", display:'flex', justifyContent:'center', alignItems:"center"}}>
            <Link  to={`/`} style={{overflow: "hidden", display:'flex', justifyContent:'center', alignItems:"center"}}><img src={Logo} alt="" style={{objectFit:'cover', borderRadius:"10px"}} className='img-fluid logo'/></Link>
          </div>   
          <div className="col"  style={{overflow: "hidden", display:'flex', justifyContent:'center', alignItems:"center"}}>
            <Link to={`/news`}><button className='btn'>Tin tức</button></Link>
          </div>
          <div className="col" style={{display:'flex', justifyContent:'center', alignItems:"center"}}>
            <Link to={`/cart`} style={{textDecoration:'none'}}><button style={{overflow: "hidden", display:'flex', justifyContent:'center', alignItems:"center"}} className='btn'>
              Giỏ hàng
              <img src={Cart} alt="" style={{width:"20%", height:"auto", marginLeft:'20px'}} className='img-fluid'/>
            </button></Link>
          </div>
          <div className="col" style={{display:'flex', justifyContent:'center', alignItems:"center"}}>
            <img src={Account} alt="" className='img-fluid' style={{width:"30%", height:"auto"}}/>
          </div>
        </div> 
      </div>
    </>
  )
}
