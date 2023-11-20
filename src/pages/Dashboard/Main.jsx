import UserIcon from '@mui/icons-material/AccountCircle';
import CarIcon from '@mui/icons-material/DirectionsCar';
import PreOrderIcon from '@mui/icons-material/EditCalendar';
import MoneyIcon from '@mui/icons-material/AttachMoney';
import BookIcon from '@mui/icons-material/CarRental';
import "../../css/card.css"

import CarData from "../../backend/Dashboard/Fetch/fetchDashboard"
import { useState } from 'react';
import { useEffect } from 'react';

export default function Main() {

    const [Car, setCar] = useState(null);
    const [Rent, setRent] = useState(null);
    const [Customer, setCustomer] = useState(null);
    useEffect(() => { CarData(setCar, setRent, setCustomer) }, [])

    const todayMonth = new Date(Date.now()).getMonth() + 1
    const todayYear = new Date(Date.now()).getFullYear()

    if (Car && Rent && Customer)
        return (
            <div>

                <h3>Trang điều khiển</h3>
                <div className="d-flex justify-content-between align-items-center mt-3">

                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-xl-3">
                                <div className="dashboardCard text-white bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium">
                                    <div className="card-block">
                                        <h6 className="m-b-20 text-3xl">Khách hàng</h6>

                                        <div className='d-flex justify-content-between mt-3'>
                                            <p className='text-xl'>{(Customer.length).toLocaleString('vi-VN')} khách</p>
                                            <UserIcon style={{ fontSize: "3em" }} />
                                        </div>
                                        <div className="m-b-0 mb-10">
                                            <br />
                                            <br />
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="col-md-4 col-xl-3">
                                <div className="dashboardCard text-white bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium">
                                    <div className="card-block">
                                        <h6 className="m-b-20 text-3xl">Xe</h6>

                                        <div className='d-flex justify-content-between mt-3'>
                                            <p className='text-xl'> {(Car.length).toLocaleString('vi-VN')} xe</p>
                                            <CarIcon style={{ fontSize: "3em" }} />
                                        </div>
                                        <div className="mb-0 mt-2 text-base">
                                            <p>Còn trống    <span className="f-right">{(Car.filter(s => s.TinhTrang == "Còn trống").length).toLocaleString('vi-VN')} xe</span></p>
                                            <p>Đang chạy    <span className="f-right">{(Car.filter(s => s.TinhTrang == "Đang thuê").length).toLocaleString('vi-VN')} xe</span></p>
                                            <p>Tạm ngừng    <span className="f-right">{(Car.filter(s => s.TinhTrang == "Tạm ngừng").length).toLocaleString('vi-VN')} xe</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>






                            <div className="col-md-4 col-xl-3">
                                <div className="dashboardCard text-white bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80 font-medium">
                                    <div className="card-block">
                                        <h6 className="m-b-20 text-3xl">Đặt xe</h6>

                                        <div className='d-flex justify-content-between mt-3'>
                                            <p className='text-xl'>{(Rent.length).toLocaleString('vi-VN')} đơn</p>
                                            <PreOrderIcon style={{ fontSize: "3em" }} />
                                        </div>
                                        <div className="mb-0 mt-2 text-base">
                                            <p>Đặt trước    <span className="f-right">{(Rent.filter(s => s.TinhTrang == "Đặt trước").length).toLocaleString('vi-VN')} đơn</span></p>
                                            <p>Hoạt động   <span className="f-right">{(Rent.filter(s => s.TinhTrang == "Hoạt động").length).toLocaleString('vi-VN')} đơn</span></p>
                                            <p>Hoàn thành   <span className="f-right">{(Rent.filter(s => s.TinhTrang == "Hoàn thành").length).toLocaleString('vi-VN')} đơn</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-4 col-xl-3">
                                <div className="dashboardCard text-white bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium">
                                    <div className="card-block">
                                        <h6 className="m-b-20 text-3xl">Doanh thu</h6>

                                        <div className='d-flex justify-content-between mt-3'>
                                            <p className='text-xl'>{(Rent.reduce((total, Rent) => total + Rent.KhachTra, 0)).toLocaleString('vi-VN')} đ</p>
                                            <MoneyIcon style={{ fontSize: "3em" }} />
                                        </div>
                                        <div className="mb-0 mt-2 text-base">
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
}