import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Logo from "../../images/logo.png";
import { useNavigate } from 'react-router-dom';
import "../CSS/News.css";

export default function News() {
  const [newsData, setNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Số bài viết trên mỗi trang
  const navigate = useNavigate(); // Hàm điều hướng

  useEffect(() => {
    fetch("/data/news.json")
      .then((res) => res.json())
      .then((data) => setNewsData(data))
      .catch((err) => console.error('Lỗi khi load dữ liệu:', err));
  }, []);

  const newArticles = newsData.filter((item) => item.type === 'new');

  // Tính toán số lượng trang
  const totalPages = Math.ceil(newArticles.length / itemsPerPage);

  // Lấy các bài viết của trang hiện tại
  const indexOfLastArticle = currentPage * itemsPerPage;
  const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
  const currentArticles = newArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Hàm điều hướng đến NewsDetail
  const handleCardClick = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="header">
          <Header />
        </div>
        <div className="content">
          <div className="container mb-5" style={{ paddingTop: '180px', minHeight: '100vh' }}>
            <div className="row">
              {/* TIN TỨC MỚI */}
              <div className="col-md-8 news-section">
                <div className="text-center my-4">
                  <img src={Logo} alt="logo" style={{ width: "50px" }} />
                  <h2 className="fw-bold mt-2">TIN TỨC MỚI</h2>
                </div>
                <div className="row row-cols-1 g-4">
                  {currentArticles.map((item) => (
                    <div className="col-12 mb-4 h-100" key={item.id}>
                      <div
                        className="card1 h-100 shadow-sm d-flex flex-column"
                        onClick={() => handleCardClick(item.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="row g-0" style={{ flexGrow: 1 }}>
                          <div className="col-4">
                            <img
                              src={item.image}
                              className="img-fluid rounded-start"
                              alt={item.title}
                              style={{
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          </div>
                          <div className="col-8 d-flex flex-column">
                            <div className="card-body1 d-flex flex-column" style={{ flexGrow: 1 }}>
                              <p className="text-muted mb-1">{item.date}</p>
                              <h5 className="card-title1 fw-bold">{item.title}</h5>
                              <p className="card-text1">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                  ))}
                </div>
                {/* Phân trang */}
                <div className="d-flex justify-content-center mt-4">
                  <nav>
                    <ul className="pagination">
                      {/* Nếu không phải trang đầu tiên, tạo nút quay lại trang trước */}
                      {currentPage > 1 && (
                        <li className="page-item">
                          <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                            Previous
                          </button>
                        </li>
                      )}

                      {/* Tạo các nút trang */}
                      {[...Array(totalPages)].map((_, index) => (
                        <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                          <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                          </button>
                        </li>
                      ))}

                      {/* Nếu không phải trang cuối cùng, tạo nút chuyển sang trang sau */}
                      {currentPage < totalPages && (
                        <li className="page-item">
                          <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                          </button>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>

              {/* TIN NỔI BẬT */}
              <div className="col-md-4">
                <h2 className="fw-bold mb-4">TIN NỔI BẬT</h2>
                {newsData
                  .filter((item) => item.type === 'highlight')
                  .map((item) => (
                    <div className="card mb-3 shadow-sm" key={item.id} onClick={() => handleCardClick(item.id)} style={{ cursor: 'pointer' }}>
                      <div className="row g-0">
                        <div className="col-4">
                          <img
                            src={item.image}
                            className="img-fluid rounded-start"
                            alt={item.title}
                            style={{ height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className="col-8">
                          <div className="card-body">
                            <p className="text-muted mb-1">{item.date}</p>
                            <h6 className="card-title">{item.title}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}
