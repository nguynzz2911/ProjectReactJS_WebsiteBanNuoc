import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function Home() {
  return (
    <>
        <div className="container-fluid">
          <div className="header">
            <Header></Header>
          </div>
          <div className="content">
            
          </div>
          <div className="footer">
            <Footer></Footer>
          </div>
        </div>
    </>
  )
}
