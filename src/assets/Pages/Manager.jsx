import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Image, Button, InputGroup, Form } from "react-bootstrap"
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Nav from '../Components/Nav';
import News from '../Components/News';
import Customer from '../Components/Customer';
import Drinks from '../Components/Drinks';
import { Routes, Route, Navigate } from "react-router-dom";

export default function Manager() {
    return (
        <>
            <div className="container-fluid">
                <div className="header">
                    <Header />
                </div>
                <div className="content" style={{ marginTop: "150px" }}>
                    <Row>
                        <Col xs="3" style={{ borderRight: "1px solid #e5e7eb" }}>
                            <Nav />
                        </Col>
                        <Col xs="9">
                            {/* đặt các trang ở đây */}
                            <Routes>
                                <Route index element={<Navigate to="cus" replace />} />
                                <Route path="cus" element={<Customer />} />
                                <Route path="drinks" element={<Drinks />} />
                                <Route path="new" element={<News />} />
                            </Routes>
                        </Col>
                    </Row>
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </div>
        </>
    )
}
