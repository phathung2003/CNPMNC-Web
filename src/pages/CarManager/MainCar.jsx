import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import "../../css/table.css"
import Value from "../../backend/CarManager/carMain"
import Delete from "../../backend/CarManager/carDelete";

export default function Info() {
    const navigate = useNavigate();
    const carInfo = Value();

    return (
        <div>
            <h2>Quản lý xe</h2>
            <div className="d-flex justify-content-between mb-3">
                <div className="row">
                    <div className="input-group">
                        <div className="form-outline" style={{ marginRight: "5px" }}>
                            <input type="text" className="form-control border border-secondary" placeholder="Tìm kiếm" name="NameSearch" />
                        </div>
                        <div>
                            <button className="btn btn-primary" type="submit">
                                <i><SearchIcon /></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <button className="btn btn-success" onClick={(e) => navigate("/CarAdd")}>Thêm xe</button>
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
                            carInfo.map(info => {
                                return <tr key={info._id}>
                                    <td align="center" style={{ width: "5%" }}>{info.ID}</td>
                                    <td align="center" style={{ verticalAlign: "middle", width: "15%" }}><img src={`${info.HinhAnh}`}></img></td>
                                    <td style={{ textAlign: "center" }}>{info.BienSo}</td>
                                    <td style={{ textAlign: "center" }}>{info.SoCho}</td>
                                    <td style={{ textAlign: "center" }}>{info.TinhTrang}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={(e) => navigate("/CarEdit", { state: info })}>Chi tiết</button>
                                        <button className="btn btn-danger ml-2" onClick={(e) => Delete(info._id, info.HinhAnh)}>Xoá bài</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div >

        </div>

    );
}