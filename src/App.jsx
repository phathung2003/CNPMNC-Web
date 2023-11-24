import { Routes, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

import Main from './pages/Login'
import Dashboard from "./pages/Dashboard/Dashboard"


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
      <Router>


        <MainLayout>
          <Route path='/' exact component={Home} />
        </MainLayout>

        <SubLayout>
          <Route path='/about' component={About} />
        </SubLayout>


      </Router>
    </div>
  )
}

//Link to thay thế cho href
//Route dùng để render ra thực thể
//bò ảnh vào file public 