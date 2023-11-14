import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';

import "../../css/Detail.css"
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
        ID: `${location.state.ID}`,
        TenXe: `${location.state.TenXe}`,
        BienSo: `${location.state.BienSo}`,
        SoCho: `${location.state.SoCho}`,
        TruyenDong: `${location.state.TruyenDong}`,
        NhienLieu: `${location.state.NhienLieu}`,
        MoTa: `${location.state.MoTa}`,
        SoTien: `${location.state.SoTien}`,
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
                    <h4 className="font-weight-bold"> Thông tin xe </h4>
                </div>

                {/*Thanh Sidebar*/}
                <div className="card overflow-hidden mt-1 d-flex">
                    <div className="row no-gutters row-bordered row-border-light">
                        <div className="col-md-3">

                            <div className="list-group list-group-flush account-settings-links">

                                {/*Hình Avatar*/}
                                <div className="justify-content-center form-group col mt-5 ml-5">
                                    <img src={`${temp}`} className="avatar" />
                                </div>
                            </div>
                        </div>


                        <div className="col-md-9">
                            <div className="tab-content">

                                {/*Thông tin xe*/}
                                <div className="tab-pane fade active show">

                                    <form onSubmit={(e) => handleSubmit(e, formData, image, setProgress)}>
                                        < div className="card-body">
                                            <div className="form-group row mt-1">
                                                <div className="col">
                                                    <label className="form-label">ID Xe</label>
                                                    <input className="form-control" defaultValue={formData.ID} disabled />
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">Tình trạng</label>
                                                    <Form.Select name="TinhTrang" defaultValue={formData.TinhTrang} onChange={Input}>
                                                        <option value="Còn trống">Còn trống</option>
                                                        <option value="Đặt trước">Đặt trước</option>
                                                        <option value="Đang thuê">Đang thuê</option>
                                                    </Form.Select>
                                                </div>
                                            </div>

                                            {/*Tên Xe*/}
                                            <div className="form-group">
                                                <div className="col">
                                                    <label className="form-label">Tên xe</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="TenXe" defaultValue={formData.TenXe} onChange={Input} />
                                                </div>
                                            </div>

                                            {/*Biển số xe & Truyền động & Số chỗ ngồi*/}
                                            <div className="form-group row mt-1">
                                                {/*Biển số xe*/}
                                                <div className="col">
                                                    <label className="form-label">Biển số xe</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="BienSo" defaultValue={formData.BienSo} onChange={Input} />
                                                </div>

                                                {/*Số chỗ ngồi*/}
                                                <div className="col">
                                                    <label className="form-label">Số chỗ ngồi</label>
                                                    <Form.Select name="SoCho" defaultValue={formData.SoCho} onChange={Input}>
                                                        <option value="4 chỗ">4 chỗ</option>
                                                        <option value="4 chỗ">8 chỗ</option>
                                                        <option value="16 chỗ">16 chỗ</option>
                                                        <option value="30 chỗ">30 chỗ</option>
                                                        <option value="45 chỗ">45 chỗ</option>
                                                    </Form.Select>
                                                </div>
                                            </div>

                                            {/*Nhiên liệu & Nhiên liệu tiêu hao & Số tiền*/}
                                            <div className="form-group row mt-1">

                                                {/*Nhiên liệu*/}
                                                <div className="col">
                                                    <label className="form-label">Nhiên liệu</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="NhienLieu" defaultValue={formData.NhienLieu} onChange={Input} />
                                                </div>

                                                {/*Truyền động*/}
                                                <div className="col">
                                                    <label className="form-label">Truyền động</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="TruyenDong" defaultValue={formData.TruyenDong} onChange={Input} />
                                                </div>

                                                {/*Số tiền*/}
                                                <div className="col">
                                                    <label className="form-label">Số tiền/1 ngày</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="SoTien" defaultValue={formData.SoTien} onChange={Input} />
                                                </div>
                                            </div>

                                            {/*Upload hình*/}
                                            <div className="form-group row mt-2">

                                                <label className="col-3"> Hình ảnh của xe </label>
                                                <label className="btn btn-outline-primary col-3">
                                                    Tải hình mới
                                                    <input type="file" className="account-settings-fileinput" onChange={onFileChange} />
                                                </label> &nbsp;
                                                <button type="button" className="btn btn-outline-secondary col-3" onClick={(e) => {
                                                    setFile("Default")
                                                    setTemp(defaultPicture)
                                                }}>Mặc định</button>
                                                <label className="small mt-1" style={{ color: "grey" }}>Cho phép JPG, GIF và PNG</label>
                                                {Progress >= 0 || Progress != undefined ? <ProgressBar className="mt-3" now={Progress} label={`${Progress != 100 ? Progress + "%" : "Tải thành công"}`} /> : ""}
                                            </div>

                                            {/*Mô tả*/}
                                            <div className="form-group mt-1">
                                                <label className="form-label">Mô tả</label>
                                                <textarea className="form-control" type="text" name="MoTa" defaultValue={formData.MoTa} onChange={Input} />
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row-reverse mb-1 mr-1   ">
                                            <button type="submit" className="btn btn-success">Lưu chỉnh sửa</button>&nbsp;
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );

}