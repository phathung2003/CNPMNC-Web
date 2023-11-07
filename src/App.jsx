import { Routes, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

import Main from './pages/test/main'
import Dashboard from "./pages/Dashboard"

const testing = true
export default function App() {

  if (testing) {
    return (
      <div>
        <Dashboard />
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