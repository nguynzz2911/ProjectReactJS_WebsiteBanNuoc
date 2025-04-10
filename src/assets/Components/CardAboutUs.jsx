import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Anh1 from "../../images/us/1.png"
import Anh2 from "../../images/us/2.png"

export default function CardAboutUs() {
  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" style={{ borderRadius: "20px" }}>
      
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1" aria-label="Slide 2"></button>
      </div>

      <div className="carousel-inner" style={{ borderRadius: "20px" }}>
        <div className="carousel-item active">
          <img src={Anh1} className="d-block w-100" alt="Ảnh 1" />
        </div>
        <div className="carousel-item">
          <img src={Anh2} className="d-block w-100" alt="Ảnh 2" />
        </div>
      </div>

      {/* Controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}
