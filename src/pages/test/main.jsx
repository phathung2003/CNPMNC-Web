import { Routes, Route, Link } from "react-router-dom"

import Contact from './contact'
import Info from './info'
import MainPage from './main'

import Login from '../Login'
import Register from '../Register'

export default function Main() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<p className="text-3xl font-bold underline">Hello, World</p>} />
                <Route path="/Info" element={<Info />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
            </Routes>
        </div>
    );
}