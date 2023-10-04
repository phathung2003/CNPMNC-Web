import { Routes, Route, Link } from "react-router-dom"

import Contact from './pages/test/contact'
import Info from './pages/test/info'
import Main from './pages/test/main'

import Login from './pages/Login'
import Register from './pages/Register'


function App() {
  return (
    <div style={{ "backgroundImage": "url('C:/Users/PC/OneDrive/Máy tính/CNPMNC-Web/src/assets/image.jpg'" }}>

      <Link to="/Contact">Contact</Link>
      <br></br>
      <Link to="/Info">Info</Link>
      <br></br>
      <Link to="/Main">Main</Link>
      <br></br>
      <Link to="/Login">Login</Link>
      <br></br>
      <Link to="/Register">Register</Link>

      <p>Nội dung các trang sẽ ở đây</p>
      <br></br>
      <Routes>
        @*Để test backend*@
        <Route path="/" element={<p className="text-3xl font-bold underline">Hello, World</p>} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/Main" element={<Main />} />

        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>

  )
}

export default App

//Link to thay thế cho href
//Route dùng để render ra thực thể