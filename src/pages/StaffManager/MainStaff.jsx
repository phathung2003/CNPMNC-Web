import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import "../../css/table.css"
import EmployeeData from "../../backend/StaffManager/Get/getEmployee"
import Delete from "../../backend/StaffManager/staffDelete";
import { useState } from 'react';

export default function Info() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const staffInfo = EmployeeData();

    return (
        <div>
            <h2>Quản lý nhân viên</h2>
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
                    <button className="btn btn-success" onClick={(e) => navigate("/StaffAdd")}>Thêm nhân viên</button>
                </div>
            </div>

            <div id="table-scroll" className="table-scroll">
                <table id="main-table" className="main-table" style={{ width: "100%" }}>
                    <thead>
                        <tr style={{ textAlign: "center" }}>
                            <th>Mã</th>
                            <th>Hình ảnh</th>
                            <th>Họ và tên</th>
                            <th>Chức vụ</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            staffInfo.filter((item) => {
                                if (search === "") return item;
                                return item.TenNV.includes(search) ||
                                    item.CMND.includes(search) ||
                                    item.DiaChi.includes(search)

                            }).map(info => {
                                return <tr key={info._id}>
                                    <td align="center" style={{ width: "5%" }}>{info.IDNV.IDNV}</td>
                                    <td align="center" style={{ verticalAlign: "middle", width: "15%" }}><img src={`${info.Avatar}`}></img></td>
                                    <td style={{ textAlign: "center" }}>{info.IDNV.TenNV}</td>
                                    <td style={{ textAlign: "center" }}>{info.ChucVu}</td>

                                    <td>
                                        <button className="btn btn-primary" onClick={(e) => navigate(`/Staff/Detail/${info._id}`, { state: info })}>Thông tin</button>
                                        {/* <button className="btn btn-danger ml-2" onClick={(e) => Delete(info._id, info.Avatar)}>Sa thải</button> */}
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