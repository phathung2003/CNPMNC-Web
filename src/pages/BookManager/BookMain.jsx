import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { format } from 'date-fns';

import "../../css/table.css"
import Data from "../../backend/CarManager/View/carMain"
import SearchData from "../../backend/RentManager/searchRentCar"

import rentData from "../../backend/BookManager/Get/rentDetail"
import fetchRent from "../../backend/BookManager/Fetch/fetchRentMain"
import CancelForm from "../../backend/BookManager/View/bookCancel"
import { useEffect } from 'react';
export default function Info() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    var carList = SearchData(Data(), search);
    const [rentList, setRentList] = useState(false)
    useEffect(() => { fetchRent(setRentList) }, [])

    if (!rentList) return;
    else
        return (
            <div>

                <div className="d-flex justify-content-between mb-5">
                    <div className="row">
                        <div className="input-group">

                            <div className="form-outline" style={{ marginRight: "5px" }}>
                                <input type="text" className="form-control border border-secondary" placeholder="Tìm kiếm" onChange={(e) => setSearch(e.target.value.toLowerCase())} />
                            </div>
                            <div>
                                <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-xl px-3 py-1.5 text-center me-2 mb-2"
                                    type="submit">
                                    <i><SearchIcon /></i>
                                </button>
                            </div>

                        </div>
                    </div>

                    <h2 className='text-center uppercase text-4xl font-bold  text-black md:text-3xl lg:text-4xl dark:text-white d-flex justify-content-center'>Quản lý sổ đặt xe</h2>

                    <div className="d-flex justify-content-end">
                        <button className="text-white bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80 font-medium rounded-lg text-xl px-3 py-1.5 text-center me-2 mb-2"
                            onClick={(e) => navigate("/Book/Add/ChooseCar")}>
                            Tạo đơn đặt trước
                        </button>
                    </div>
                </div>

                <div id="table-scroll" className="table-scroll">
                    <table id="main-table" className="main-table" style={{ width: "100%" }}>
                        <thead>
                            <tr style={{ textAlign: "center" }}>
                                <th>ID Đơn</th>
                                <th>Người đặt</th>
                                <th>Số điện thoại</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody className='text-base'>
                            {
                                rentList.length != 0 ? rentList.map((info) => {
                                    return <tr key={info._id}>
                                        <td style={{ textAlign: "center", width: "1vw" }}>{info.IDDon}</td>
                                        <td style={{ textAlign: "center", width: "10vw" }}>{info.IDKH.TenKH}</td>
                                        <td style={{ textAlign: "center", width: "7vw" }}>{info.IDKH.SoDienThoai}</td>
                                        <td style={{ textAlign: "center", width: "3vw" }}>{`${format(info.NgayBatDau, "dd/MM/yyyy")}`}</td>
                                        <td style={{ textAlign: "center", width: "3vw" }}>{`${format(info.NgayKetThuc, "dd/MM/yyyy")}`}</td>

                                        <td className='h-grid col-3 mx-auto' style={{ width: "17vw" }}>
                                            <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-base px-3 py-3 text-center me-2 mb-2 "
                                                onClick={(e) => navigate(`/Book/Detail/${info.IDXe._id}/${info._id}`)}>
                                                Chi tiết
                                            </button>

                                            <button className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-base px-3 py-3 text-center me-2 mb-2"
                                                onClick={(e) => {
                                                    info.IDXe.TinhTrang != "Còn trống" ?
                                                        alert("Xe này hiện đang được chạy nên không thể đặt xe được !") :
                                                        navigate(`/Book/Create/${info._id}`)
                                                }}>Làm đơn</button>

                                            <button className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-base px-3 py-3 text-center me-2 mb-2"
                                                onClick={(e) => CancelForm(e, info._id, navigate)}>
                                                Huỷ đơn
                                            </button>
                                        </td>
                                    </tr>
                                }) : <tr><td colSpan={8} height={100} className='text-center text-2xl font-bold bg-transparent'>Hiện tại chưa có đơn đặt trước nào !</td></tr>
                            }
                        </tbody>
                    </table>
                </div >
            </div >
        );
}
