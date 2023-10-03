import { Routes, Route, Link } from "react-router-dom"
import Contact from "./pages/contact"
import Info from "./pages/info"
import Main from "./pages/main";

export default function App() {
  return (
    <div className="App">
      <div>
        <Link to="/Contact">Contact</Link>
        <br></br>
        <Link to="/Info">Info</Link>
        <br></br>
        <Link to="/Main">Main</Link>

        <Routes>
          <Route path="/" element={<p>Hello, World</p>} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Info" element={<Info />} />
          <Route path="/Main" element={<Main />} />
        </Routes>
      </div>
    </div>
  )
}

//Link to thay thế cho href
//Route dùng để render ra thực thể