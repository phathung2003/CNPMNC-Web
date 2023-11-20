import { useState, useEffect } from 'react';
import { format } from 'date-fns';

import UserIcon from '@mui/icons-material/AccountCircle';
import CarIcon from '@mui/icons-material/DirectionsCar';
import PreOrderIcon from '@mui/icons-material/EditCalendar';
import MoneyIcon from '@mui/icons-material/AttachMoney';
import SearchIcon from '@mui/icons-material/Search';
import "../../css/card.css"

import CarData from "../../backend/Dashboard/Fetch/fetchDashboard"
import SearchData from '../../backend/Dashboard/searchHistory';

export default function Main() {

    const [Car, setCar] = useState(null);
    const [Rent, setRent] = useState(null);
    const [Customer, setCustomer] = useState(null);
    const [History, setHistory] = useState(null);
    const [search, setSearch] = useState("");

    if (History != null) {
        var historyList = SearchData(History, search);
    }


    useEffect(() => { CarData(setCar, setRent, setCustomer, setHistory) }, [])
    const todayMonth = new Date(Date.now()).getMonth() + 1
    const todayYear = new Date(Date.now()).getFullYear()

    if (Car && Rent && Customer && History)
        return (
            <div>
                <div className="d-flex justify-content-between align-items-center">

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
                                            <p className='text-xl'>{(Rent.reduce((total, currentValue) => total + currentValue.KhachTra, 0)).toLocaleString('vi-VN')} đ</p>
                                            <MoneyIcon style={{ fontSize: "3em" }} />
                                        </div>
                                        <div className="mb-0 mt-2 text-base">
                                            <p>Tháng này    <span className="f-right">{(History.filter(s => new Date(s.Ngay).getMonth() + 1 == todayMonth && new Date(s.Ngay).getFullYear() == todayYear).reduce((total, History) => total + History.ThongTin, 0)).toLocaleString('vi-VN')} đ</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-between mb-2 mt-3">

                    <div>
                        <h3 className='text-center font-bold  text-black md:text-3xl lg:text-3xl dark:text-white d-flex justify-content-center'>Lịch sử thuê xe</h3>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <div className="form-outline" style={{ marginRight: "5px" }}>
                                <input type="text" className="form-control border border-secondary" placeholder="Tìm kiếm" onChange={(e) => setSearch(e.target.value.toLowerCase())} />
                            </div>
                            <div>
                                <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-xl px-3 py-1.5 text-center me-2 mb-2 "
                                    type="submit">
                                    <i><SearchIcon /></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="table-scroll" className="table-scroll" style={{ maxHeight: "45vh" }} >
                    <table id="main-table" className="main-table">
                        <thead >
                            <tr style={{ textAlign: "center" }}>
                                <th>Thời gian</th>
                                <th>Mã đơn</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>

                        <tbody className='text-base'>
                            {
                                historyList.length != 0 ? historyList.sort(function (a, b) { return b.Ngay - a.Ngay }).map(info => {
                                    return <tr key={info._id}>
                                        <td style={{ width: "15vw", paddingLeft: "20px" }}>{format(info.Ngay, "dd/MM/yyyy HH:mm:ss")}</td>
                                        <td style={{ textAlign: "center", width: "10vw" }}>{info.MaDon}</td>
                                        <td style={{ width: '80vw' }}>{info.MoTa}</td>
                                    </tr>
                                }) : <tr><td colSpan={3} height={100} className='text-center text-2xl font-bold bg-transparent'>Hiện tại chưa có hoạt động nào !</td></tr>
                            }
                        </tbody>
                    </table>
                </div >


            </div>

        )
}