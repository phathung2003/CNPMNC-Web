import "../css/Dashboard.css"
import Logo from "../assets/images/Logo_DarkMode.png"
import { Box, IconButton, useTheme } from "@mui/material";

import UserIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CarIcon from '@mui/icons-material/DirectionsCar';
import PreOrderIcon from '@mui/icons-material/EditCalendar';
import BookIcon from '@mui/icons-material/CarRental';

export default function Drawer() {
    return (
        <>
            <div className="sidebar">
                <div className="logo-content">
                    <div className="logo">
                        <img src={Logo} id="logoImg" />
                    </div>
                </div>

                <ul className="nav-links">
                    <li> <a href="/Dashboard">
                        <i><DashboardIcon /></i>
                        <span className="link_name">Thanh điều khiển</span>
                    </a>

                        <ul className="sub-menu blank">
                            <li><a className="link_name" href="#">Thanh điều khiển</a></li>
                        </ul>
                    </li>


                    <li>
                        <div className="iocn-link">
                            <div className="link">
                                <a href="#">
                                    <i><CarIcon /></i>
                                    <span className="link_name">Quản lý xe</span>
                                </a>
                            </div>
                        </div>

                        <ul className="sub-menu">
                            <li><a className="link_name" href="#">Quản lý xe</a></li>
                        </ul>
                    </li>


                    < li >
                        <div className="iocn-link">
                            <div className="link">
                                <a href="#">

                                    <i><PreOrderIcon /></i>

                                    <span className="link_name">Sổ đặt xe</span>
                                </a>
                            </div>
                            <i className='bx bxs-chevron-down arrow'></i>
                        </div >

                        <ul className="sub-menu">
                            <li><a className="link_name" href="#">Sổ đặt xe</a></li>
                            <li><a href="#">Chưa duyệt</a></li>
                            <li><a href="#">Đã duyệt</a></li>
                        </ul >
                    </li >

                    < li >
                        <div className="iocn-link">
                            <div className="link">
                                <a href="#">
                                    <i><BookIcon /></i>
                                    <span className="link_name">Sổ xe</span>
                                </a>
                            </div>
                        </div >

                        <li ul className="sub-menu" >
                            <li><a className="link_name" href="#">Sổ xe</a></li >
                        </li>
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

            <div class="home-content">
                <p>#Send Help</p>
            </div>
        </>

    );
}
