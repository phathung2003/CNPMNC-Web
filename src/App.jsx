import { Routes, Route, Link } from "react-router-dom"

import Contact from './pages/test/contact'
import Info from './pages/test/info'
import Main from './pages/test/main'

import Login from './pages/Login'
import Register from './pages/Register'


export default function App() {
  return (
    <div>
        
    <div>
        
      <Link to="/Contact">Contact</Link>
      <br></br>
      <Link to="/Info">Info</Link>
      <br></br>
      <Link to="/Main">Main</Link>
      <br></br>
      <Link to="/Login">Login</Link>
      <br></br>
      <Link to="/Register">Register</Link>

          <div  >
            
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
      </div>
    </div>
  )
}

//Link to thay thế cho href
//Route dùng để render ra thực thể
//bò ảnh vào file public 