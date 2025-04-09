import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Anh1 from "../../images/carosel1.png";
import Anh2 from "../../images/carosel2.png";
import Anh3 from "../../images/carosel3.png";
import Anh4 from "../../images/carosel4.png";

export default function MyCarousel() {
  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={Anh1} className="d-block w-100" alt="Ảnh 1" />
        </div>
        <div className="carousel-item">
          <img src={Anh2} className="d-block w-100" alt="Ảnh 2" />
        </div>
        <div className="carousel-item">
          <img src={Anh3} className="d-block w-100" alt="Ảnh 3" />
        </div>
        <div className="carousel-item">
          <img src={Anh4} className="d-block w-100" alt="Ảnh 4" />
        </div>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
