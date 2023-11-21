import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import "../../css/table.css"
import Value from "../../backend/StaffManager/staffMain"
import Delete from "../../backend/StaffManager/staffDelete";

import ValueTK from "../../backend/TaiKhoanManager/taikhoanMain"

import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function Info() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const staffInfo = Value();
    const taikhoanInfo = ValueTK();

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

                
            </div>

            <div id="table-scroll" className="table-scroll">
                <table id="main-table" className="main-table" style={{ width: "100%" }}>
                    <thead>
                        <tr style={{ textAlign: "center" }}>
                            <th>ID</th>
                            <th>Hình Ảnh</th>
                            <th>Tên tài khoản</th>
                            <th>Mật khẩu</th>
                            <th>Chức vụ</th>
                            <th>Tình Trạng</th>

                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {staffInfo.concat(taikhoanInfo)
                            .filter((item) => {
                                if (search === "") return true;

                                return (
                                    item.IDNV.toLowerCase().includes(search) ||
                                    item.TenNV.toLowerCase().includes(search) ||
                                    item.NgaySinh.toLowerCase().includes(search) ||
                                    item.CMND.toLowerCase().includes(search) ||
                                    item.DiaChi.toLowerCase().includes(search)
                                );
                            })
                            .length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: "center" }}>
                                        Hiện tại không có tài khoản nào
                                    </td>
                                </tr>
                            ) : (
                                staffInfo.concat(taikhoanInfo).map((info) => {
                                    return (
                                        <tr key={info._id}>
                                            <td align="center" style={{ width: "5%" }}>
                                                {info.IDNV}
                                            </td>
                                            <td
                                                align="center"
                                                style={{ verticalAlign: "middle", width: "15%" }}
                                            >
                                                <img src={`${info.Avatar}`} alt="Avatar"></img>
                                            </td>
                                            <td align="center" style={{ width: "5%" }}>
                                                {info.TenTaiKhoan}
                                            </td>
                                            <td style={{ textAlign: "center" }}>{info.MatKhau}</td>
                                            <td style={{ textAlign: "center" }}>{info.ChucVu}</td>
                                            <td style={{ textAlign: "center" }}>{info.TinhTrang}</td>

                                            <td>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={(e) => navigate("/StaffEdit", { state: info })}
                                                >
                                                    Chi tiết
                                                </button>
                                                <button
                                                    className="btn btn-danger ml-2"
                                                    onClick={(e) => Delete(info._id, info.Avatar)}
                                                >
                                                    Xoá Tài khoản
                                                </button>

                                                {info.TenTaiKhoan == null && (
                                                    <button
                                                        className="btn btn-warning ml-2"
                                                        onClick={(e) => navigate("/TaiKhoanAdd", { state: { _id: info.IDNV, Avatar: info.Avatar } })}
                                                    >
                                                        Thêm Tài khoản
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                    </tbody>
                </table>
            </div >

        </div>
    );
}
