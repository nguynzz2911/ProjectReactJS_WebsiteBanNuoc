import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../../images/logo.png"; 

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetch("/data/news.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedArticle = data.find((item) => item.id === parseInt(id)); // Chú ý chuyển đổi ID sang kiểu số
        setArticle(selectedArticle);
        setNewsData(data);
      })
      .catch((err) => console.error('Lỗi khi load dữ liệu:', err));
  }, [id]);

  if (!article) return <div>Loading...</div>;

  const highlightArticles = newsData.filter((item) => item.type === 'highlight');

  const handleCardClick = (highlightId) => {
    navigate(`/news/${highlightId}`);
  };

  return (
    <>
      <Header />
      <div className="container mb-5" style={{ paddingTop: '180px' }}>
        <div className="row">
          {/* Chi tiết bài viết */}
          <div className="col-md-8">
            <h2 className="fw-bold">{article.title}</h2>
            <p className="text-muted">{article.date}</p>
            <img src={article.image} alt={article.title} className="img-fluid mb-4" />
            <p>{article.description}</p>
            <p>{article.content}</p>
          </div>

          {/* Tin nổi bật */}
          <div className="col-md-4">
            <h2 className="fw-bold mb-4">TIN NỔI BẬT</h2>
            {highlightArticles.map((item) => (
              <div
                className="card mb-3 shadow-sm"
                key={item.id}
                onClick={() => handleCardClick(item.id)} // Sự kiện click để chuyển đến trang chi tiết
                style={{ cursor: 'pointer' }}
              >
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
      <Footer />
    </>
  );
}
