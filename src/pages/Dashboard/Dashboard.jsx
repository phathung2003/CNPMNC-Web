
import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { IconButton } from "@mui/material";
import Logo from "../../assets/images/Logo_DarkMode.png"

import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ArrowIcon from '@mui/icons-material/ArrowDropDown';

import UserIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CarIcon from '@mui/icons-material/DirectionsCar';
import PreOrderIcon from '@mui/icons-material/EditCalendar';
import BookIcon from '@mui/icons-material/CarRental';
import PersonIcon from '@mui/icons-material/Person';

import "../../css/dashboard.css"
import DashboardMain from './Main'

import CarMain from '../CarManager/MainCar'
import CarAdd from '../CarManager/AddCar'
import CarEdit from '../CarManager/DetailCar'

import BookMain from '../BookManager/BookMain'
import BookChooseCar from '../BookManager/BookChooseCar'
import BookAdd from '../BookManager/BookAdd'
import BookDetail from '../BookManager/BookDetail'
import BookCreateRent from '../BookManager/BookCreateRent'

import RentMain from '../RentManager/RentMain'
import RentAdd from '../RentManager/RentAdd'
import RentDetail from '../RentManager/RentDetail'
import RentCheckout from '../RentManager/RentCheckout'

import StaffMain from '../StaffManager/MainStaff'
import StaffAdd from '../StaffManager/AddStaff'
import StaffDetail from '../StaffManager/DetailStaff'
import handleSubmit from "../../backend/checkLogin";

export default function Drawer() {

    //Thu nhỏ thanh (Có lưu biến tạm [localStorage.getItem*=('Tên biến') === 'Gía trị ngược với mình muốn'])
    const [showMenu, setShowMenu] = useState(localStorage.getItem('showMenu') === 'true');
    useEffect(() => { localStorage.setItem('showMenu', showMenu); }, [showMenu]);
    const handleArrowClick = () => { setShowMenu(!showMenu); };
    const sidebarclassName = showMenu ? 'sidebar close' : 'sidebar';
    const handleSidebarToggle = () => { setShowMenu((prevShowMenu) => !prevShowMenu); };
    const menuBtnclassName = showMenu ? <MenuOpenIcon style={{ transform: "rotate(-180deg)", transition: "all 0.5s ease" }} /> : <MenuOpenIcon style={{ transition: "all 0.5s ease" }} />;


    //Danh sách xe (Có lưu biến tạm [localStorage.getItem*=('Tên biến') === 'Gía trị ngược với mình muốn'])
    const [showListCar, setShowListCar] = useState(localStorage.getItem('showListCar') === 'true');
    useEffect(() => { localStorage.setItem('showListCar', showListCar); }, [showListCar]);
    const handleListCar = () => { setShowListCar(!showListCar); };
    const dropDownBtnCar = showListCar ? <ArrowIcon style={{ transform: "rotate(-180deg)", transition: "all 0.5s ease" }} /> : <ArrowIcon style={{ transition: "all 0.5s ease" }} />;
    const ListDropCar = showListCar ? "sub-menu showMenu" : "sub-menu"

    //Sổ xe (Có lưu biến tạm [localStorage.getItem*=('Tên biến') === 'Gía trị ngược với mình muốn'])
    const [showListBook, setShowListBook] = useState(localStorage.getItem('showListBook') === 'true');
    useEffect(() => { localStorage.setItem('showListBook', showListBook); }, [showListBook]);
    const handleListBook = () => { setShowListBook(!showListBook); };
    const dropDownBtnBook = showListBook ? <ArrowIcon style={{ transform: "rotate(-180deg)", transition: "all 0.5s ease" }} /> : <ArrowIcon style={{ transition: "all 0.5s ease" }} />;
    const ListDropBook = showListBook ? "sub-menu showMenu" : "sub-menu"

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [login, setLogin] = useState(localStorage.getItem('login') === 'true')
    useEffect(() => { localStorage.setItem('login', login); }, [login]);

    const [name, setName] = useState(localStorage.getItem('name'))
    useEffect(() => { localStorage.setItem('name', name); }, [name]);

    const [role, setRole] = useState(localStorage.getItem('role'))
    useEffect(() => { localStorage.setItem('role', role); }, [role]);

    if (!login) {
        return (
            <div className="flex justify-center items-center mt-20">
                <div className="w-full p-4 bg-white rounded-md shadow-xl max-w-md">
                    <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
                        Đăng nhập
                    </h1>

                    <form className="mt-4" onSubmit={(e) => handleSubmit(e, email, password, setError, setLogin, setName, setRole)}>
                        <div className="mb-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Tên tài khoản
                            </label>
                            <input
                                type="text"
                                autoComplete="off"
                                name="emailInput"
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-3 py-2 text-sm text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                autoComplete="off"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full px-3 py-2 text-sm text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="mt-2">
                            <button type="submit"
                                className="w-full px-3 py-2 text-sm text-white transition-colors duration-200 bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Đăng nhập
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <div className={sidebarclassName}>

                    <div className="logo-content">
                        <div className="logo">
                            <img src={Logo} id="logoImg" />
                        </div>
                        <button id="btn" onClick={handleSidebarToggle}><i>{menuBtnclassName}</i></button>
                    </div>


                    <ul className="nav-links">


                        <li>

                            <div className="icon-link">
                                <div className="link">
                                    <Link to="/">
                                        <i><DashboardIcon /></i>
                                        <span className="link_name">Trang điều khiển</span>
                                    </Link>
                                </div>
                            </div>

                            <ul className="sub-menu">
                                <li><a className="link_name" href="/">Trang điều khiển</a></li>
                            </ul>

                        </li>


                        {/*Quản lý xe*/}
                        <li>
                            <div className="icon-link">
                                <div className="link">
                                    <a href="/Car">
                                        <i><CarIcon /></i>
                                        <span className="link_name">Quản lý xe</span>
                                    </a>
                                </div>

                                <i className="arrow" onClick={handleListCar}>{dropDownBtnCar}</i>
                            </div>


                            <ul className={ListDropCar}>
                                <li className="showMenu"><a className="link_name" href="/Car">Quản lý xe</a></li>
                                <li className="showMenu"><a href="/Car">Trang chủ</a></li>
                                <li className="showMenu"><a href="/Car/Add">Thêm xe</a></li>
                            </ul>
                        </li>

                        {/*Sổ đặt xe*/}
                        <li>
                            <div className="icon-link">
                                <div className="link">
                                    <a href="/Book">
                                        <i><PreOrderIcon /></i>
                                        <span className="link_name">Sổ đặt xe</span>
                                    </a>
                                </div>

                                <i className="arrow" onClick={handleListBook}>{dropDownBtnBook}</i>
                            </div>


                            <ul className={ListDropBook}>
                                <li className="showMenu"><a className="link_name" href="/Book">Sổ đặt xe</a></li>
                                <li className="showMenu"><a href="/Book">Trang chủ</a></li>
                                <li className="showMenu"><a href="Book/Add/ChooseCar">Tạo đơn</a></li>
                            </ul>
                        </li>


                        {/*Sổ xe*/}
                        <li>
                            <div className="icon-link">
                                <div className="link">
                                    <Link to="/Rent">
                                        <i><BookIcon /></i>
                                        <span className="link_name">Sổ xe</span>
                                    </Link>
                                </div>
                            </div>

                            <ul className="sub-menu">
                                <li><a className="link_name" href="/Rent">Sổ xe</a></li>
                            </ul>
                        </li>


                        <li>
                            <div className="icon-link">
                                <div className="link">
                                    <Link to="/Staff">
                                        <i><PersonIcon /></i>
                                        <span className="link_name">Nhân viên</span>
                                    </Link>
                                </div>
                            </div>

                            <ul className="sub-menu">
                                <li><a className="link_name" href="/Staff">Quản lý nhân viên</a></li>
                            </ul>
                        </li>

                    </ul >

                    <div className="profile-content">
                        <div className="profile">

                            <a href="#" style={{ textDecoration: "none", color: "white" }}>
                                <div className="profile-details">

                                    <IconButton style={{ color: "#ffffff" }} id="userImg">
                                        <UserIcon />
                                    </IconButton>

                                    <div className="name-job">

                                        <div className="name">{`${name}`}</div>

                                        <div className="job">{`${role}`}</div>
                                    </div>
                                </div>
                            </a>

                            <a>
                                <IconButton style={{ color: "#ffffff" }} id="log_out" onClick={(e) => { setLogin(false); setName(null); setRole(null) }}>
                                    <LogoutIcon />
                                </IconButton>
                            </a>
                        </div>
                    </div>


                </div >

                <div className="home-content">
                    <Routes>
                        <Route path="/" element={<DashboardMain />} />
                        <Route path="/Car" element={<CarMain />} />
                        <Route path="/Car/Add" element={<CarAdd />} />
                        <Route path="/Car/Detail/:id" element={<CarEdit />} />

                        <Route path="/Book" element={<BookMain />} />
                        <Route path="/Book/Add/ChooseCar" element={<BookChooseCar />} />
                        <Route path="/Book/Add/:id" element={<BookAdd />} />
                        <Route path="/Book/Detail/:IDXe/:IDDon" element={<BookDetail />} />
                        <Route path="/Book/Create/:IDDon" element={<BookCreateRent />} />

                        <Route path="/Rent" element={<RentMain />} />
                        <Route path="/Rent/Add/:id" element={<RentAdd />} />
                        <Route path="/Rent/Detail/:id" element={<RentDetail />} />
                        <Route path="/Rent/Checkout/:id" element={<RentCheckout />} />

                        <Route path="/Staff" element={<StaffMain />} />
                        <Route path="/StaffAdd" element={<StaffAdd />} />
                        <Route path="/Staff/Detail/:id" element={<StaffDetail />} />
                    </Routes>
                </div>
            </div >
        );
    }

}
