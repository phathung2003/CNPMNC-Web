import { Routes, Route, Link } from "react-router-dom"

import Contact from './pages/test/contact'
import Info from './pages/test/info'
import Main from './pages/test/main'

import Login from './pages/Login'
import Register from './pages/Register'

import Dashboard from "./pages/dashboard/dashboardMain"

const testing = true;
export default function App() {

  if (testing) {
    return (
      <div>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    )
  }
  return (
    <div>
      <Main />
    </div>
  )
}

//Link to thay thế cho href
//Route dùng để render ra thực thể
//bò ảnh vào file public 