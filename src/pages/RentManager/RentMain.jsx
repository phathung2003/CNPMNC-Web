import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import "../../css/table.css"
import Data from "../../backend/CarManager/View/carMain"
import Delete from "../../backend/CarManager/carDelete";
import SearchData from "../../backend/CarManager/searchCar"
import { render } from '@fullcalendar/core/preact';

export default function Info() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    var carList = SearchData(Data(), search);

    return (
        <div>
            <h2>Quản lý sổ xe</h2>
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
                            <th>ID</th>
                            <th>Hình Ảnh</th>
                            <th>Biển Số</th>
                            <th>Số Chỗ</th>
                            <th>Tình Trạng</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            carList.length != 0 ? carList.map(info => {
                                return <tr key={info._id}>
                                    <td align="center" style={{ width: "5%" }}>{info.IDXe}</td>
                                    <td align="center" style={{ verticalAlign: "middle", width: "15%" }}><img src={`${info.HinhAnh}`}></img></td>
                                    <td style={{ textAlign: "center" }}>{info.BienSo}</td>
                                    <td style={{ textAlign: "center" }}>{info.SoCho}</td>
                                    <td style={{ textAlign: "center" }}>{info.TinhTrang}</td>
                                    <td>
                                        {info.TinhTrang == "Còn trống" ?
                                            <button button className="btn btn-success" onClick={(e) => navigate("/Rent/Add", { state: info })}>Làm đơn</button> :
                                            <div>
                                                <button button className="btn btn-primary" onClick={(e) => navigate("/Rent/Add", { state: info })}>Chi tiết</button>
                                                <button className="btn btn-danger ml-2" onClick={(e) => Delete(info._id, info.HinhAnh)}>Xoá bài</button>
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
