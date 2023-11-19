import "../css/Dashboard.css"
import { Link, Route, Routes } from "react-router-dom";
import { IconButton } from "@mui/material";
import Logo from "../assets/images/Logo_DarkMode.png"

import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ArrowIcon from '@mui/icons-material/ArrowDropDown';

import UserIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CarIcon from '@mui/icons-material/DirectionsCar';
import PreOrderIcon from '@mui/icons-material/EditCalendar';
import BookIcon from '@mui/icons-material/CarRental';

// import Test from './test/test'

import CarMain from './CarManager/MainCar'
import CarAdd from './CarManager/AddCar'
import CarEdit from './CarManager/DetailCar'

import BookMain from './BookManager/BookMain'
import BookChooseCar from './BookManager/BookChooseCar'
import BookAdd from './BookManager/BookAdd'
import BookDetail from './BookManager/BookDetail'
import BookCreateRent from './BookManager/BookCreateRent'

import RentMain from './RentManager/RentMain'
import RentAdd from './RentManager/RentAdd'
import RentDetail from './RentManager/RentDetail'
import RentCheckout from './RentManager/RentCheckout'
import { useState } from "react";

export default function Drawer() {
    const [showMenu, setShowMenu] = useState(false);
    const [showList, setShowList] = useState(false);

    const handleArrowClick = () => {
        setShowMenu(!showMenu);
    };

    const handleListClick = () => {
        setShowList(!showList);
    };

    const handleSidebarToggle = () => {
        setShowMenu((prevShowMenu) => !prevShowMenu);
    };

    const menuBtnClass = showMenu ? <MenuOpenIcon style={{ transform: "rotate(-180deg)", transition: "all 0.5s ease" }} /> : <MenuOpenIcon style={{ transition: "all 0.5s ease" }} />;

    const dropDownBtnClass = showList ? <ArrowIcon style={{ transform: "rotate(-180deg)", transition: "all 0.5s ease" }} /> : <ArrowIcon style={{ transition: "all 0.5s ease" }} />;
    const ListDrop = showList ? "sub-menu showMenu" : "sub-menu"
    const sidebarClass = showMenu ? 'sidebar close' : 'sidebar';

    return (
        <div>
            <div className={sidebarClass}>

                <div class="logo-content">
                    <div class="logo">
                        <img src={Logo} id="logoImg" />
                    </div>
                    <button id="btn" onClick={handleSidebarToggle}><i>{menuBtnClass}</i></button>
                </div>

                <ul className="nav-links">
                    <li>
                        <div className="icon-link">
                            <div className="link">
                                <Link to="/Car">
                                    <i><CarIcon /></i>
                                    <span className="link_name">Quản lý xe</span>
                                </Link>
                            </div>
                        </div>

                        <ul className="sub-menu">
                            <li><a className="link_name" href="/Car">Quản lý xe</a></li>
                        </ul>
                    </li>







                    <li>

                        <div class="icon-link">
                            <div class="link">
                                <a href="#">
                                    <i class='bx bxs-calendar-event'></i>
                                    <span class="link_name">Sự kiện</span>
                                </a>
                            </div>

                            <i className="showMenu" onClick={handleListClick}>{dropDownBtnClass}</i>
                        </div>


                        <ul className={ListDrop}>
                            <li className="showMenu"><a class="link_name" href="#">Sự kiện</a></li>
                            <li className="showMenu"><a href="#">Chưa duyệt</a></li>
                            <li className="showMenu"><a href="#">Đã duyệt</a></li>
                        </ul>

                    </li>








                    <li>
                        <div className="icon-link">
                            <div className="link">
                                <Link to="/Car">
                                    <i><CarIcon /></i>
                                    <span className="link_name">Quản lý xe</span>
                                </Link>
                            </div>
                        </div>

                        <ul className="sub-menu">
                            <li><a className="link_name" href="/Car">Quản lý xe</a></li>
                            <li><a href="/Car">Quản lý xe</a></li>
                        </ul>
                    </li>


                    <li>
                        <div className="icon-link">
                            <div className="link">
                                <a href="/Book">

                                    <i><PreOrderIcon /></i>

                                    <span className="link_name">Sổ đặt xe</span>
                                </a>
                            </div>
                            <i className='bx bxs-chevron-down arrow'></i>
                        </div >

                        <ul className="sub-menu">
                            <li><a className="link_name" href="/Book">Sổ đặt xe</a></li>
                        </ul>
                    </li>

                    <li>
                        <div className="icon-link">
                            <div className="link">
                                <a href="/Rent">
                                    <i><BookIcon /></i>
                                    <span className="link_name">Sổ xe</span>
                                </a>
                            </div>
                        </div >

                        <ul className="sub-menu" >
                            <li><a className="link_name" href="/Rent">Sổ xe</a></li >
                        </ul>
                    </li >
                </ul >

                <div className="profile-content">
                    <div className="profile">

                        <a href="#" style={{ textDecoration: "none", color: "white" }}>
                            <div className="profile-details">

                                <IconButton style={{ color: "#ffffff" }} id="userImg">
                                    <UserIcon />
                                </IconButton>

                                <div className="name-job">

                                    <div className="name">Hưng Nguyễn</div>

                                    <div className="job">Giám đốc</div>
                                </div>
                            </div>
                        </a>

                        <a href="#">
                            <IconButton style={{ color: "#ffffff" }} id="log_out">
                                <LogoutIcon />
                            </IconButton>
                        </a>
                    </div>
                </div>


            </div >

            <div className="home-content">
                <Routes>
                    <Route path="/" element={<p className="text-3xl font-bold underline">Trang Chủ</p>} />
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
                </Routes>
            </div>
        </div >
    );
}
