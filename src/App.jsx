import HomePage from './assets/Pages/HomePage.jsx'
import Detail from './assets/Pages/Detail.jsx'
import News from './assets/Pages/News.jsx'
import Cart from './assets/Pages/Cart.jsx'
import Contact from './assets/Pages/Contact.jsx'
import About from './assets/Pages/AboutUs.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/news" element={<News />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>  
    </>
  )
}

export default App