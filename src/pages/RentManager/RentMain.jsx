import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import "../../css/table.css"
import Data from "../../backend/CarManager/View/carMain"
import SearchData from "../../backend/RentManager/searchRentCar"

export default function Info() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    var carList = SearchData(Data(), search);

    return (
        <div>

            <div className="d-flex justify-content-between mb-5">
                <div className="row">
                    <div className="input-group">

                        <div className="form-outline" style={{ marginRight: "5px" }}>
                            <input type="text" className="form-control border border-secondary" placeholder="Tìm kiếm" onChange={(e) => setSearch(e.target.value.toLowerCase())} />
                        </div>
                        <div>
                            <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-xl px-5 py-1.5 text-center me-2 mb-2 "
                                type="submit">
                                <i><SearchIcon /></i>
                            </button>
                        </div>

                    </div>
                </div>

                <h2 className='text-center uppercase text-4xl font-bold  text-black md:text-3xl lg:text-4xl dark:text-white d-flex justify-content-center'>Quản lý sổ xe</h2>

                <div className="d-flex justify-content-end">
                    {/* <button className="btn btn-success" onClick={(e) => navigate("/CarAdd")}>Thêm xe</button> */}
                </div>
                <div />
            </div>

            <div id="table-scroll" className="table-scroll">
                <table id="main-table" className="main-table">
                    <thead>
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
                            carList.length != 0 ? carList.map((info) => {
                                return <tr key={info._id}>
                                    <td align="center" style={{ width: "8vw", backgroundColor: '#fff' }}>{info.IDXe}</td>
                                    <td align="center" style={{ verticalAlign: "middle", width: "20vw" }}><img src={`${info.HinhAnh}`}></img></td>
                                    <td style={{ textAlign: "center", width: '10vw' }}>{info.BienSo}</td>
                                    <td style={{ textAlign: "center", width: '5vw' }}>{info.SoCho} chỗ</td>
                                    <td style={{ textAlign: "center", width: '7vw' }}>{info.TinhTrang}</td>
                                    <td>
                                        {info.TinhTrang == "Còn trống" ?
                                            <button className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-base px-4 py-3 text-center me-2 mb-2"
                                                onClick={(e) => navigate(`/Rent/Add/${info._id}`, { state: info })}>
                                                Làm đơn
                                            </button> :
                                            <div>
                                                <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-base px-5 py-3 text-center me-2 mb-2 "
                                                    onClick={(e) => navigate(`/Rent/Detail/${info.IDDon}`)}>
                                                    Chi tiết
                                                </button>
                                                <button className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-base px-5 py-3 text-center me-2 mb-2"
                                                    onClick={(e) => navigate(`/Rent/Checkout/${info.IDDon}`)}>
                                                    Trả xe
                                                </button>
                                            </div>
                                        }
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
