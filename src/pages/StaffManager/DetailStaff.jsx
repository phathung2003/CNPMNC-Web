import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';

import "../../css/Detail.css"
import handleSubmit from "../../backend/StaffManager/View/staffEdit";
import convertToBase64 from "../../backend/Feature/convertToBase64";
import getData from "../../backend/StaffManager/Fetch/fetchEmployee"


const defaultPicture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/default_user.png?alt=media";


export default function EditCar() {
    const params = useParams();
    const IDParams = params.id;

    const [image, setFile] = useState(defaultPicture);
    const [temp, setTemp] = useState(defaultPicture);
    const [Progress, setProgress] = useState();
    const [inUploadProgress, setInUploadProgress] = useState(false);
    const [formData, setFormData] = useState({ loading: false });

    useEffect(() => { getData(IDParams, setFormData, setFile, setTemp) }, [])

    const Input = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

    const onFileChange = (event) => {
        // Updating the state 
        setFile(event.target.files[0]);
        convertToBase64(event, setTemp)
    };


    const location = useLocation();

    return (
        <div>
            <div className="container light-style flex-grow-1 container-p-y">

                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary mb-0" onClick={(e) => window.history.back()}>Quay lại</button>
                    <h4 className="font-weight-bold"> Thêm nhân viên </h4>
                </div>

                {/*Thanh Sidebar*/}
                <div className="card overflow-hidden mt-1 d-flex">
                    <div className="row no-gutters row-bordered row-border-light">

                        <div className="col-md-3">
                            <div className="list-group list-group-flush account-settings-links">


                                {/*Hình Avatar*/}
                                <div className="justify-content-center form-group col mt-20 ml-5">
                                    <img src={`${temp}`} className="avatar mt-0" />

                                    {Progress >= 0 || Progress != undefined ? <ProgressBar className="mt-3" now={Progress} label={`${Progress != 100 ? Progress + "%" : "Tải thành công"}`} /> : ""}
                                </div>
                            </div>
                        </div>


                        <div className="col-md-9">
                            <div className="tab-content">

                                {/*Thông tin nhân viên*/}
                                <div className="tab-pane fade active show">

                                    <form onSubmit={(e) => handleSubmit(e, formData, image, setFile, setProgress, inUploadProgress, setInUploadProgress)}>
                                        < div className="card-body">


                                            <div className="form-group row mt-2">
                                                <div className="col">
                                                    <label className="form-label">Mã nhân viên</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="TenNV" defaultValue={formData.IDNV} disabled />
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">Chức vụ</label>
                                                    <Form.Select name="ChucVu" defaultValue={formData.ChucVu} onChange={Input}>
                                                        <option value={"Kế toán"}>Kế toán</option>
                                                        <option value={"Giám đốc"}>Giám đốc</option>
                                                    </Form.Select>
                                                </div>
                                            </div>







                                            <div className="form-group row mt-3">
                                                <div className="col">
                                                    <label className="form-label">Tên nhân viên</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="TenNV" defaultValue={formData.TenNV} onChange={Input} />
                                                </div>

                                                <div className="col">
                                                    <label className="form-label">Ngày sinh</label>
                                                    <input className="form-control" type="date" autoComplete="off" name="NgaySinh" onChange={Input} />
                                                </div>
                                            </div>


                                            <div className="form-group">


                                            </div>


                                            <div className="form-group row mt-3">

                                                <div className="col">
                                                    <label className="form-label">Số điện thoại</label>

                                                    <input className="form-control" type="text" autoComplete="off" name="SoDienThoai" defaultValue={formData.SoDienThoai} onChange={Input} />
                                                </div>

                                                <div className="col">
                                                    <label className="form-label">CMND/CCCD</label>

                                                    <input className="form-control" type="text" autoComplete="off" name="CMND" defaultValue={formData.CMND} onChange={Input} />
                                                </div>
                                            </div>

                                            <div className="form-group row mt-3">
                                                <div className="col">
                                                    <label className="form-label">Địa chỉ</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="DiaChi" defaultValue={formData.DiaChi} onChange={Input} />
                                                </div>
                                            </div>

                                            {/*Upload hình*/}
                                            <div className="form-group row mt-3">

                                                <label className="col-3"> Hình đại diện </label>
                                                <label className="btn btn-outline-primary col-3">
                                                    Tải hình mới
                                                    <input type="file" className="account-settings-fileinput" onChange={onFileChange} />
                                                </label> &nbsp;
                                                <button type="button" className="btn btn-outline-secondary col-3" onClick={(e) => {
                                                    setFile("Default")
                                                    setTemp(defaultPicture)
                                                }}>Mặc định</button>
                                                <label className="small mt-1" style={{ color: "grey" }}>Cho phép JPG và PNG</label>

                                            </div>
                                        </div>

                                        <div className="d-flex flex-row-reverse mb-1 mr-1   ">
                                            {!inUploadProgress ?
                                                <button type="submit" className="btn btn-success">Lưu</button> :
                                                <button className="btn btn-secondary">Đang lưu dữ liệu</button>
                                            }
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