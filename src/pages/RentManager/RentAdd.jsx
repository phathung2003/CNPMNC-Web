import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';

import "../../css/Detail.css"
import "../../css/pictureUpload.css"
import handleSubmit from "../../backend/CarManager/carEdit";

const defaultPicture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/car%2Fdefault_vehicle.png?alt=media&token=4235fd2d-9431-49df-8d32-153a99c3fc2e";

export default function EditCar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [image, setFile] = useState(location.state.HinhAnh);
    const [temp, setTemp] = useState(location.state.HinhAnh);
    const [Progress, setProgress] = useState();

    const [formData, setFormData] = useState({
        _id: `${location.state._id}`,
        IDXe: `${location.state.ID}`,
        TenXe: `${location.state.TenXe}`,
        BienSo: `${location.state.BienSo}`,
        SoCho: `${location.state.SoCho}`,
        TruyenDong: `${location.state.TruyenDong}`,
        NhienLieu: `${location.state.NhienLieu}`,
        MoTa: `${location.state.MoTa}`,
        SoTien: parseInt(`${location.state.SoTien}`),
        HinhAnh: `${location.state.HinhAnh}`,
        TinhTrang: `${location.state.TinhTrang}`,
    });

    const Input = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onFileChange = (event) => {
        // Updating the state 
        setFile(event.target.files[0]);
        convertToBase64(event)
    };

    function convertToBase64(e) {
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setTemp(reader.result);
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        };
    }


    return (
        <div>
            <div className="container light-style flex-grow-1 container-p-y">

                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary mb-0" onClick={(e) => navigate("/Car")}>Quay lại</button>
                    <h3> Đơn thuê xe </h3>
                </div>

                {/*Thanh Sidebar*/}
                <div className="card overflow-hidden mt-1 d-flex">
                    <div className="row no-gutters row-bordered row-border-light">
                        <div className="col-md-5">

                            <div className="list-group list-group-flush account-settings-links  ml-5 ">

                                <h3 className="mt-1">Thông tin xe</h3>

                                {/*Hình Avatar*/}
                                <div className="justify-content-center form-group col">
                                    <img src={`${temp}`} className="carPicture" />
                                </div>

                                {/*Tên xe*/}
                                <h2 className="mt-1">{formData.TenXe}</h2>

                                {/*ID Xe & Tình trạng*/}
                                <div className="form-group row mt-1">
                                    <p className="col"><strong>ID Xe: </strong> {formData.IDXe}</p>
                                    <p className="col"><strong>Tình trạng: </strong> {formData.TinhTrang}</p>
                                </div>

                                {/*Biển số & Trạng thái*/}
                                <div className="form-group row mt-1">
                                    <p className="col"><strong>Biển số: </strong> {formData.BienSo}</p>
                                    <p className="col"><strong>Số chỗ: </strong> {formData.SoCho}</p>
                                </div>

                                {/*Truyền động & Nhiên liệu*/}
                                <div className="form-group row mt-1">
                                    <p className="col"><strong>Truyền động: </strong> {formData.TruyenDong}</p>
                                    <p className="col"><strong>Nhiên liệu: </strong> {formData.NhienLieu}</p>
                                </div>

                                <p><strong>Mô tả</strong></p>
                                <p>{formData.MoTa}</p>
                            </div>
                        </div>


                        <div className="col-md-7">
                            <div className="tab-content">

                                {/*Thông tin người thuê*/}
                                <div className="tab-pane fade active show">
                                    <h3 className="mt-1 ml-2">Thông tin người thuê</h3>

                                    <form onSubmit={(e) => handleSubmit(e, formData, image, setProgress)}>
                                        < div className="card-body">

                                            <div className="form-group row mt-0">
                                                <div className="col">
                                                    <label className="form-label">Họ và tên</label>
                                                    <input className="form-control" />
                                                </div>

                                                <div className="col">
                                                    <label className="form-label">Ngày sinh</label>
                                                    <input className="form-control" />
                                                </div>
                                            </div>

                                            <div className="form-group row mt-2">
                                                <div className="col">
                                                    <label className="form-label">Địa chỉ</label>
                                                    <input className="form-control" defaultValue={formData.ID} />
                                                </div>

                                                <div className="col">
                                                    <label className="form-label">Số điện thoại</label>
                                                    <input className="form-control" defaultValue={formData.ID} />
                                                </div>
                                            </div>

                                            {/*Biển số xe & Truyền động & Số chỗ ngồi*/}
                                            {/*Upload hình*/}
                                            <div className="form-group row mt-2">


                                                <div className="col">
                                                    <div className="form-group col">
                                                        <div className="col">
                                                            <label className="form-label">CMND/CCCD</label>
                                                            <input className="form-control" defaultValue={formData.ID} />
                                                        </div>

                                                        <div class="img-area mt-2">
                                                            <img src={`${temp}`} className="carPicture" />
                                                            <h3>Hình CMND</h3>
                                                        </div>

                                                        {Progress >= 0 || Progress != undefined ? <ProgressBar className="mt-3" now={Progress} label={`${Progress != 100 ? Progress + "%" : "Tải thành công"}`} /> :
                                                            <label label className="select-image btn btn-outline-primary mt-1">
                                                                Tải hình CMND/CCCD
                                                                <input type="file" className="account-settings-fileinput" onChange={onFileChange} />
                                                            </label>
                                                        }
                                                    </div>
                                                </div>

                                                <div className="col">
                                                    <div className="form-group col">
                                                        <div className="col">
                                                            <label className="form-label">Giấy phép lái xe</label>
                                                            <input className="form-control" defaultValue={formData.ID} />
                                                        </div>

                                                        <div class="img-area mt-2">
                                                            <img src={`${temp}`} className="carPicture" />
                                                            <h3>Hình CMND</h3>
                                                        </div>

                                                        {Progress >= 0 || Progress != undefined ? <ProgressBar className="mt-3" now={Progress} label={`${Progress != 100 ? Progress + "%" : "Tải thành công"}`} /> :
                                                            <label label className="select-image btn btn-outline-primary mt-1 p-2">
                                                                Tải hình giấy phép lái xe
                                                                <input type="file" className="account-settings-fileinput" onChange={onFileChange} />
                                                            </label>
                                                        }
                                                    </div>
                                                </div>
                                            </div>



                                            <h3 className="mt-3 ml-2">Thông tin thuê</h3>


                                            <div className="form-group row mt-0">
                                                <div className="col">
                                                    <label className="form-label">Ngày bắt đầu</label>
                                                    <input className="form-control" />
                                                </div>

                                                <div className="col">
                                                    <label className="form-label">Ngày kết thúc</label>
                                                    <input className="form-control" />
                                                </div>
                                            </div>

                                            <label className="form-label mt-2">Hoá đơn</label>

                                            <div className="form-group row mt-0">
                                                <hr></hr>
                                                <p className="col">Đơn giá 1 ngày</p>
                                                <p className="col">{formData.SoTien.toLocaleString('en-US')} đ/ngày</p>
                                                <hr></hr>
                                                <p className="col">Tổng phí thuê xe</p>
                                                <p className="col">{formData.SoTien.toLocaleString('en-US')} đ x 17 ngày</p>
                                                <hr></hr>
                                                <h5 className="col font-bold">Tổng cộng</h5>
                                                <p className="col font-bold">{formData.SoTien.toLocaleString('en-US')} đ</p>
                                            </div>



                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-success row mb-2" style={{width: "100%"}}>Lưu</button>
                                        </div>



                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        </div >
    );

}