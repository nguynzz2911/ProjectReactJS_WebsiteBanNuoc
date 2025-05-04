import React from 'react'
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import Customer from '../../images/navicons/customer.png'
import Drink from '../../images/navicons/drink.png'
import News from '../../images/navicons/news.png'
import '../CSS/Nav.css'

export default function Nav() {
  return (
    <>
    <div className="container-nav">
      <ul className="menu">
        <li>
          <Link to="/">
            {/* <img src="/img/dashboard.png" alt="Dashboard" /> */}
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/cus">
            <img src={Customer} alt="Customer" style={{marginRight: '10px'}}/>
            <span>Customer</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/drinks">
            <img src={Drink} alt="Drinks" style={{marginRight: '10px'}}/>
            <span>Drinks</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/new">
            <img src={News} alt="News" style={{marginRight: '10px'}}/>
            <span>News</span>
          </Link>
        </li>
      </ul>
    </div>
    </>
  )
}
