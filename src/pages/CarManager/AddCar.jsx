import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';

import "../../css/Detail.css"
//Xử lý backend
import handleSubmit from "../../backend/CarManager/carAdd";

const defaultPicture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/car%2Fdefault_vehicle.png?alt=media&token=4235fd2d-9431-49df-8d32-153a99c3fc2e";

export default function AddCar() {
    const navigate = useNavigate();
    const [image, setFile] = useState("Default");
    const [temp, setTemp] = useState(defaultPicture);
    const [Progress, setProgress] = useState();

    const [formData, setFormData] = useState({
        TenXe: "",
        BienSo: "",
        SoCho: "4 chỗ",
        TruyenDong: "",
        NhienLieu: "",
        MoTa: "",
        SoTien: "",
        HinhAnh: `${defaultPicture}`,
        TinhTrang: "Còn trống",
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
                    <h4 className="font-weight-bold"> Thêm xe </h4>
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
                                            {/*Tên Xe*/}
                                            <div className="form-group">
                                                <div className="col">
                                                    <label className="form-label">Tên xe</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="TenXe" onChange={Input} />
                                                </div>
                                            </div>

                                            {/*Biển số xe & Truyền động & Số chỗ ngồi*/}
                                            <div className="form-group row mt-1">
                                                {/*Biển số xe*/}
                                                <div className="col">
                                                    <label className="form-label">Biển số xe</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="BienSo" onChange={Input} />
                                                </div>

                                                {/*Số chỗ ngồi*/}
                                                <div className="col">
                                                    <label className="form-label">Số chỗ ngồi</label>
                                                    <Form.Select name="SoCho" defaultValue={"4 chỗ"} onChange={Input}>
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
                                                    <input className="form-control" type="text" autoComplete="off" name="NhienLieu" onChange={Input} />
                                                </div>

                                                {/*Truyền động*/}
                                                <div className="col">
                                                    <label className="form-label">Truyền động</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="TruyenDong" onChange={Input} />
                                                </div>

                                                {/*Số tiền*/}
                                                <div className="col">
                                                    <label className="form-label">Số tiền/1 ngày</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="SoTien" onChange={Input} />
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
                                                }}>Reset</button>
                                                <label className="small mt-1" style={{ color: "grey" }}>Cho phép JPG, GIF và PNG</label>
                                                {Progress >= 0 || Progress != undefined ? <ProgressBar className="mt-3" now={Progress} label={`${Progress != 100 ? Progress + "%" : "Tải thành công"}`} /> : ""}
                                            </div>

                                            {/*Mô tả*/}
                                            <div className="form-group mt-1">
                                                <label className="form-label">Mô tả</label>
                                                <textarea className="form-control" type="text" name="MoTa" onChange={Input} />
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