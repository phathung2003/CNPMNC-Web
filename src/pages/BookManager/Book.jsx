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
                <h2>Quản lý sổ đặt xe</h2>
                <div className="d-flex justify-content-between mb-3">
                    <div className="row">
                        <div className="input-group">

                            <div className="form-outline" style={{ marginRight: "5px" }}>
                                <input type="text" className="form-control border border-secondary" placeholder="Tìm kiếm" onChange={(e) => setSearch(e.target.value.toLowerCase())} />
                            </div>
                            <div>
                                <button className="btn btn-primary" type="submit">
                                    <i><SearchIcon /></i>
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="d-flex justify-content-end">
                        {/* <button className="btn btn-success" onClick={(e) => navigate("/CarAdd")}>Thêm xe</button> */}
                    </div>
                </div>

                <div id="table-scroll" className="table-scroll">
                    <table id="main-table" className="main-table" style={{ width: "100%" }}>
                        <thead>
                            <tr style={{ textAlign: "center" }}>
                                <th>ID Đơn</th>
                                <th>Biển Số</th>
                                <th>Người đặt</th>
                                <th>Số điện thoại</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                rentList.length != 0 ? rentList.map((info) => {
                                    return <tr key={info._id}>
                                        <td align="center" style={{ width: "1vw" }}>{info.IDDon}</td>
                                        <td style={{ textAlign: "center", width: "8vw" }}>{info.IDXe.BienSo}</td>
                                        <td style={{ textAlign: "center" }}>{info.IDKH.TenKH}</td>
                                        <td style={{ textAlign: "center" }}>{info.IDKH.SoDienThoai}</td>
                                        <td style={{ textAlign: "center", width: "4vw" }}>{`${format(info.NgayBatDau, "dd/MM/yyyy")}`}</td>
                                        <td style={{ textAlign: "center", width: "4vw" }}>{`${format(info.NgayKetThuc, "dd/MM/yyyy")}`}</td>
                                        <td className='h-grid col-3 mx-auto'>
                                            <button className="btn btn-primary" onClick={(e) => navigate(`/Book/Detail/${info.IDXe._id}/${info._id}`)}>Chi tiết</button>
                                            <button className="btn btn-success ml-1" onClick={(e) => navigate(`/Book/Create/${info._id}`)}>Tạo đơn</button>
                                            <button className="btn btn-danger ml-1" onClick={(e) => CancelForm(e, info._id, navigate)}>Huỷ đơn</button>
                                        </td>
                                    </tr>
                                }) : <tr><td colSpan={6} height={100} className='text-center text-2xl font-bold bg-transparent'>Hiện tại chưa có xe nào !</td></tr>
                            }
                        </tbody>
                    </table>
                </div >
            </div >
        );
}
