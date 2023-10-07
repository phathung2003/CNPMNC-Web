import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Contact from './pages/test/contact';
import Info from './pages/test/info';
import Main from './pages/test/main';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/Contact">Contact</Link>
            </li>
            <li>
              <Link to="/Info">Info</Link>
            </li>
            <li>
              <Link to="/Main">Main</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/Register">Register</Link>
            </li>
          </ul>
        </nav>
    

        <p>Nội dung các trang sẽ ở đây</p>

        <Routes>
          {/* Để test backend */}
          <Route path="/" element={<p className="text-3xl font-bold underline">Hello, World</p>} />
        <Route path="/" element={<p className="text-3xl font-bold underline">Duplicate</p>} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Info" element={<Info />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
    </div>
  );
}

//Link to thay thế cho href
//Route dùng để render ra thực thể