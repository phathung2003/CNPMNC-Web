import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import "../../css/table.css"
import Data from "../../backend/CarManager/View/carMain"
import Delete from "../../backend/CarManager/Post/carDelete";
import SearchData from "../../backend/CarManager/searchCar"

export default function Info() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    var carList = SearchData(Data(), search);
    return (
        <div>

            <div className="d-flex justify-content-between mb-3">

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

                <h1 className='text-center uppercase text-4xl font-bold  text-black md:text-3xl lg:text-4xl dark:text-white d-flex justify-content-center'>
                    Quản lý xe
                </h1>

                <div className="d-flex justify-content-end">
                    <button className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2" onClick={(e) => navigate("/Car/Add")}>
                        Thêm xe
                    </button>
                </div>
            </div>

            <div id="table-scroll" className="table-scroll">
                <table id="main-table" className="main-table">
                    <thead >
                        <tr style={{ textAlign: "center" }}>
                            <th>ID</th>
                            <th>Hình Ảnh</th>
                            <th>Biển Số</th>
                            <th>Số Chỗ</th>
                            <th>Tình Trạng</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody className='text-base'>
                        {
                            carList.length != 0 ? carList.map(info => {
                                return <tr key={info._id}>
                                    <td align="center" style={{ width: "10vw" }}>{info.IDXe}</td>
                                    <td align="center" style={{ width: "18vw" }}><img src={`${info.HinhAnh}`}></img></td>
                                    <td style={{ textAlign: "center", width: "15vw" }}>{info.BienSo}</td>
                                    <td style={{ textAlign: "center", width: '6vw' }}>{info.SoCho} chỗ</td>
                                    <td style={{ textAlign: "center", width: '10vw' }}>{info.TinhTrang}</td>
                                    <td style={{ width: '30vw' }}>
                                        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-base px-5 py-3 text-center me-2 mb-2 "
                                            onClick={(e) => navigate(`/Car/Detail/${info._id}`, { state: info })}>Chi tiết</button>
                                        {info.TinhTrang != "Đang thuê" ?
                                            <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-base px-5 py-3 text-center me-2 mb-2"
                                                onClick={(e) => Delete(info._id, info.HinhAnh)}>Xoá bài</button> : <div />}
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
