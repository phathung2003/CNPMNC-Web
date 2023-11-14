import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';

import "../../css/Detail.css"
//Xử lý backend
import handleSubmit from "../../backend/StaffManager/staffAdd";
import convertToBase64 from "../../backend/Feature/convertToBase64"

const defaultPicture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/default_user.jpg?alt=media";

export default function AddStaff() {
    const navigate = useNavigate();

    const [imageNV, setNVImage] = useState("Default");
    const [tempNV, setNVTemp] = useState(defaultPicture);
    const [ProgressNV, setNVProgress] = useState();

    const [imageCMND, setCMNDImage] = useState("Default");
    const [tempCMND, setCMNDTemp] = useState(defaultPicture);
    const [ProgressCMND, setCMNDProgess] = useState();

    const [formData, setFormData] = useState({
        Avatar: `${defaultPicture}`,
        TenNV: "",
        NgaySinh: "",
        DiaChi: "",
        SoDienThoai: "",
        CMND: "",
        HinhCMND: `${defaultPicture}`,
    });

    const Input = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onFileChange = (event) => {
        switch (event.target.name) {
            case "CMND":
                setCMNDImage(event.target.files[0]);
                convertToBase64(event, setCMNDTemp)
                break;
            default:
                setNVImage(event.target.files[0]);
                convertToBase64(event, setNVTemp)
        }
    };

    

    return (
        <div>
            <div className="container light-style flex-grow-1 container-p-y">

                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary mb-0" onClick={(e) => navigate("/Staff")}>Quay lại</button>
                    <h4 className="font-weight-bold"> Thêm xe </h4>
                </div>

                {/*Thanh Sidebar*/}
                <div className="card overflow-hidden mt-1 d-flex">
                    <div className="row no-gutters row-bordered row-border-light">
                        <div className="col-md-3">

                            <div className="list-group list-group-flush account-settings-links">

                                {/*Hình Avatar*/}
                                <div className="justify-content-center form-group col mt-5 ml-5">
                                    <img src={`${tempNV}`} className="avatar" />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">

                            <div className="list-group list-group-flush account-settings-links">

                                {/*Hình Avatar*/}
                                <div className="justify-content-center form-group col mt-5 ml-5">
                                    <img src={`${tempCMND}`} className="avatar" />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-9">
                            <div className="tab-content">

                                {/*Thông tin nhân viên*/}
                                <div className="tab-pane fade active show">

                                    <form onSubmit={(e) => handleSubmit(e, formData, imageNV, imageCMND ,setNVProgress, setCMNDProgess)}>
                                        < div className="card-body">
                                            {/*Tên Nhân viên*/}
                                            <div className="form-group">
                                                <div className="col">
                                                    <label className="form-label">Tên nhân viên</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="TenNV" onChange={Input} />
                                                </div>
                                            </div>

                                            {/*Ngày sinh, Địa chỉ, Số điện thoại, CMND*/}
                                            <div className="form-group row mt-1">
                                                {/*Ngày sinh*/}
                                                <div className="col">
                                                    <label className="form-label">Ngày Sinh</label>
                                                    <input className="form-control" type="date" autoComplete="off" name="NgaySinh" onChange={Input} />
                                                </div>

                                                {/*Địa chỉ*/}
                                                <div className="col">
                                                    <label className="form-label">Địa chỉ</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="DiaChi" onChange={Input} />
                                                </div>
                                                {/*SDT*/}
                                                <div className="col">
                                                    <label className="form-label">SDT</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="SoDienThoai" onChange={Input} />
                                                </div>
                                                {/*CMND*/}
                                                <div className="col">
                                                    <label className="form-label">CMND</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="CMND" onChange={Input} />
                                                </div>
                                            </div>

                                            

                                            {/*Upload hình NV*/}
                                            <div className="form-group row mt-2">

                                                <label className="col-3"> Hình ảnh nhân viên </label>
                                                <label className="btn btn-outline-primary col-3">
                                                    Tải hình mới
                                                    <input type="file" name="NV" className="account-settings-fileinput" onChange={onFileChange} />
                                                </label> &nbsp;
                                                <button type="button" className="btn btn-outline-secondary col-3" onClick={(e) => {
                                                    setNVImage("Default")
                                                    setNVTemp(defaultPicture)
                                                }}>Reset</button>
                                                <label className="small mt-1" style={{ color: "grey" }}>Cho phép JPG, GIF và PNG</label>
                                                {ProgressNV >= 0 || ProgressNV != undefined ? <ProgressBar className="mt-3" now={ProgressNV} label={`${ProgressNV != 100 ? ProgressNV + "%" : "Tải thành công"}`} /> : ""}
                                            </div>

                                            {/*Upload hình CMND */}
                                            <div className="form-group row mt-2">

                                                <label className="col-3"> Hình ảnh CMND </label>
                                                <label className="btn btn-outline-primary col-3">
                                                    Tải hình mới
                                                    <input type="file" name="CMND" className="account-settings-fileinput" onChange={onFileChange} />
                                                </label> &nbsp;
                                                <button type="button" className="btn btn-outline-secondary col-3" onClick={(e) => {
                                                    setCMNDImage("Default")
                                                    setCMNDTemp(defaultPicture)
                                                }}>Reset</button>
                                                <label className="small mt-1" style={{ color: "grey" }}>Cho phép JPG, GIF và PNG</label>
                                                {ProgressCMND >= 0 || ProgressCMND != undefined ? <ProgressBar className="mt-3" now={ProgressCMND} label={`${ProgressCMND != 100 ? ProgressCMND + "%" : "Tải thành công"}`} /> : ""}
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row-reverse mb-1 mr-1   ">
                                            <button type="submit" className="btn btn-success">Lưu</button>&nbsp;
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';

import "../../css/Detail.css"
//Xử lý backend
import handleSubmit from "../../backend/StaffManager/staffAdd";
import convertToBase64 from "../../backend/Feature/convertToBase64"

const defaultPicture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/car%2Fdefault_vehicle.png?alt=media&token=4235fd2d-9431-49df-8d32-153a99c3fc2e";

export default function AddStaff() {
    const navigate = useNavigate();

    const [imageNV, setNVImage] = useState("Default");
    const [tempNV, setNVTemp] = useState(defaultPicture);
    const [ProgressNV, setNVProgress] = useState();

    const [imageCMND, setCMNDImage] = useState("Default");
    const [tempCMND, setCMNDTemp] = useState(defaultPicture);
    const [ProgressCMND, setCMNDProgess] = useState();

    const [formData, setFormData] = useState({
        Avatar: `${defaultPicture}`,
        TenNV: "",
        NgaySinh: "",
        DiaChi: "",
        SoDienThoai: "",
        CMND: "",
        HinhCMND: `${defaultPicture}`,
    });

    const Input = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onFileChange = (event) => {
        switch (event.target.name) {
            case "CMND":
                setCMNDImage(event.target.files[0]);
                convertToBase64(event, setCMNDTemp)
                break;
            default:
                setNVImage(event.target.files[0]);
                convertToBase64(event, setNVTemp)
        }
    };

    

    return (
        <div>
            <div className="container light-style flex-grow-1 container-p-y">

                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary mb-0" onClick={(e) => navigate("/Staff")}>Quay lại</button>
                    <h4 className="font-weight-bold"> Thêm xe </h4>
                </div>

                {/*Thanh Sidebar*/}
                <div className="card overflow-hidden mt-1 d-flex">
                    <div className="row no-gutters row-bordered row-border-light">
                        <div className="col-md-3">

                            <div className="list-group list-group-flush account-settings-links">

                                {/*Hình Avatar*/}
                                <div className="justify-content-center form-group col mt-5 ml-5">
                                    <img src={`${tempNV}`} className="avatar" />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">

                            <div className="list-group list-group-flush account-settings-links">

                                {/*Hình Avatar*/}
                                <div className="justify-content-center form-group col mt-5 ml-5">
                                    <img src={`${tempCMND}`} className="avatar" />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-9">
                            <div className="tab-content">

                                {/*Thông tin nhân viên*/}
                                <div className="tab-pane fade active show">

                                    <form onSubmit={(e) => handleSubmit(e, formData, imageNV, imageCMND ,setNVProgress, setCMNDProgess)}>
                                        < div className="card-body">
                                            {/*Tên Nhân viên*/}
                                            <div className="form-group">
                                                <div className="col">
                                                    <label className="form-label">Tên nhân viên</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="TenNV" onChange={Input} />
                                                </div>
                                            </div>

                                            {/*Ngày sinh, Địa chỉ, Số điện thoại, CMND*/}
                                            <div className="form-group row mt-1">
                                                {/*Ngày sinh*/}
                                                <div className="col">
                                                    <label className="form-label">Ngày Sinh</label>
                                                    <input className="form-control" type="date" autoComplete="off" name="NgaySinh" onChange={Input} />
                                                </div>

                                                {/*Địa chỉ*/}
                                                <div className="col">
                                                    <label className="form-label">Địa chỉ</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="DiaChi" onChange={Input} />
                                                </div>
                                                {/*SDT*/}
                                                <div className="col">
                                                    <label className="form-label">SDT</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="SoDienThoai" onChange={Input} />
                                                </div>
                                                {/*CMND*/}
                                                <div className="col">
                                                    <label className="form-label">CMND</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="CMND" onChange={Input} />
                                                </div>
                                            </div>

                                            

                                            {/*Upload hình NV*/}
                                            <div className="form-group row mt-2">

                                                <label className="col-3"> Hình ảnh nhân viên </label>
                                                <label className="btn btn-outline-primary col-3">
                                                    Tải hình mới
                                                    <input type="file" name="NV" className="account-settings-fileinput" onChange={onFileChange} />
                                                </label> &nbsp;
                                                <button type="button" className="btn btn-outline-secondary col-3" onClick={(e) => {
                                                    setNVImage("Default")
                                                    setNVTemp(defaultPicture)
                                                }}>Reset</button>
                                                <label className="small mt-1" style={{ color: "grey" }}>Cho phép JPG, GIF và PNG</label>
                                                {ProgressNV >= 0 || ProgressNV != undefined ? <ProgressBar className="mt-3" now={ProgressNV} label={`${ProgressNV != 100 ? ProgressNV + "%" : "Tải thành công"}`} /> : ""}
                                            </div>

                                            {/*Upload hình CMND */}
                                            <div className="form-group row mt-2">

                                                <label className="col-3"> Hình ảnh CMND </label>
                                                <label className="btn btn-outline-primary col-3">
                                                    Tải hình mới
                                                    <input type="file" name="CMND" className="account-settings-fileinput" onChange={onFileChange} />
                                                </label> &nbsp;
                                                <button type="button" className="btn btn-outline-secondary col-3" onClick={(e) => {
                                                    setCMNDImage("Default")
                                                    setCMNDTemp(defaultPicture)
                                                }}>Reset</button>
                                                <label className="small mt-1" style={{ color: "grey" }}>Cho phép JPG, GIF và PNG</label>
                                                {ProgressCMND >= 0 || ProgressCMND != undefined ? <ProgressBar className="mt-3" now={ProgressCMND} label={`${ProgressCMND != 100 ? ProgressCMND + "%" : "Tải thành công"}`} /> : ""}
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row-reverse mb-1 mr-1   ">
                                            <button type="submit" className="btn btn-success">Lưu</button>&nbsp;
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
