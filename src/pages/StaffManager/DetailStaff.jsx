import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';

import "../../css/Detail.css"
import handleSubmit from "../../backend/StaffManager/staffEdit";
import convertToBase64 from "../../backend/Feature/convertToBase64";
import { formatDate } from "@fullcalendar/core";

const defaultPicture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/car%2Fdefault_vehicle.png?alt=media&token=4235fd2d-9431-49df-8d32-153a99c3fc2e";



export default function EditCar() {
    const params = useParams();
    const navigate = useNavigate();

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




    // const [formData, setFormData] = useState({

    //     _id: `${location.state._id}`,
    //     IDNV: `${location.state.IDNV}`,
    //     TenNV: `${location.state.TenNV}`,
    //     // NgaySinh: `${location.state.NgaySinh}`,
    //     NgaySinh: `${location.state.NgaySinh}`,
    //     DiaChi: `${location.state.DiaChi}`,
    //     CMND: `${location.state.CMND}`,
    //     SoDienThoai: `${location.state.SoDienThoai}`,
    //     HinhCMND: `${location.state.HinhCMND}`,
    //     Avatar: `${location.state.Avatar}`

    // });





    return (
        <div>
            <div className="container light-style flex-grow-1 container-p-y">

                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary mb-0" onClick={(e) => navigate("/Staff")}>Quay lại</button>
                    <h4 className="font-weight-bold"> Thông tin nhân viên </h4>
                </div>

                {/*Thanh Sidebar*/}
                <div className="card overflow-hidden mt-1 d-flex">
                    <div className="row no-gutters row-bordered row-border-light">

                        <div className="col-md-3">
                            <div className="list-group list-group-flush account-settings-links">

                                {/*Hình Avatar*/}
                                <div className="justify-content-center form-group col mt-4 ml-5">
                                    <img src={`${tempNV}`} className="avatar mt-0" />

                                    {ProgressNV >= 0 || ProgressNV != undefined ? <ProgressBar className="mt-3" now={ProgressNV} label={`${ProgressNV != 100 ? ProgressNV + "%" : "Tải thành công"}`} /> : ""}

                                    <div className="form-group col mt-3 ml-3 mr-3 mb-0">

                                        <div className="row">
                                            <label className="btn btn-outline-primary">
                                                Tải hình mới
                                                <input type="file" className="account-settings-fileinput" name="NV" onChange={onFileChange} />
                                            </label> &nbsp;
                                        </div>

                                        <div className="row">
                                            <button type="button" className="btn btn-outline-secondary" onClick={(e) => {
                                                setNVImage("Default")
                                                setNVTemp(defaultPicture)
                                            }}>Mặc định</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-md-9">
                            <div className="tab-content">

                                {/*Thông tin nhân viên*/}
                                <div className="tab-pane fade active show">

                                    <form onSubmit={(e) => handleSubmit(e, formData, imageNV, setNVProgress, imageCMND, setCMNDProgress)}>
                                        < div className="card-body">
                                            <div className="form-group row mt-1">
                                                <div className="col">
                                                    <label className="form-label">ID Nhân viên</label>
                                                    <input className="form-control" defaultValue={formData.IDNV} disabled />
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">Tên nhân viên</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="TenNV" defaultValue={formData.TenNV} onChange={Input} />
                                                </div>
                                            </div>


                                            <div className="form-group">
                                                <div className="col">
                                                    <label className="form-label">Ngày sinh</label>
                                                    <input className="form-control" type="date" autoComplete="off" name="NgaySinh" defaultValue={formatDate(formData.NgaySinh)} onChange={Input} />
                                                </div>
                                            </div>


                                            <div className="form-group row mt-1">

                                                <div className="col">
                                                    <label className="form-label">Địa chỉ</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="DiaChi" defaultValue={formData.DiaChi} onChange={Input} />
                                                </div>


                                                <div className="col">
                                                    <label className="form-label">SDT</label>

                                                    <input className="form-control" type="text" autoComplete="off" name="SoDienThoai" defaultValue={formData.SoDienThoai} onChange={Input} />
                                                </div>

                                                <div className="col">
                                                    <label className="form-label">CMND</label>

                                                    <input className="form-control" type="text" autoComplete="off" name="CMND" defaultValue={formData.CMND} onChange={Input} />
                                                </div>
                                            </div>



                                            {/*Upload hình*/}

                                            <div className="form-group row mt-2">
                                                <label className="col-3"> Hình ảnh của CMND </label>

                                                <div className="col-5">
                                                    <img src={`${tempCMND}`} className="avatar m-0" />
                                                    {ProgressCMND >= 0 || ProgressCMND != undefined ? <ProgressBar className="mt-1" now={ProgressCMND} label={`${ProgressCMND != 100 ? ProgressCMND + "%" : "Tải thành công"}`} /> : ""}
                                                </div>

                                                <div className="col-2">

                                                    <div className="row mt-3">
                                                        <label className="btn btn-outline-primary row-2">
                                                            Tải hình mới
                                                            <input type="file" className="account-settings-fileinput" name="CMND" onChange={onFileChange} />
                                                        </label> &nbsp;
                                                        
                                                        <button type="button" className="btn btn-outline-secondary row-3" onClick={(e) => {
                                                            setCMNDImage("Default")
                                                            setCMNDTemp(defaultPicture)
                                                        }}>Mặc định</button>

                                                       
                                                    </div>
                                                </div>

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