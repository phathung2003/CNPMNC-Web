import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';

import "../../css/Detail.css"
import handleSubmit from "../../backend/CarManager/View/carEdit";
import getData from "../../backend/CarManager/Fetch/fecthCarDetail"
import convertToBase64 from "../../backend/Feature/convertToBase64";

const defaultPicture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/default_vehicle.png?alt=media";

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

    if (!formData.loading) return;
    else
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

                                    {/*Hình Xe*/}
                                    <div className="justify-content-center form-group col mt-5 ml-5">
                                        <img src={`${temp}`} className="avatar" />
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-9">
                                <div className="tab-content">

                                    {/*Thông tin xe*/}
                                    <div className="tab-pane fade active show">

                                        <form onSubmit={(e) => handleSubmit(e, formData, image, setFile, setProgress, inUploadProgress, setInUploadProgress)}>
                                            < div className="card-body">
                                                <div className="form-group row mt-1">
                                                    <div className="col">
                                                        <label className="form-label">ID Xe</label>
                                                        <input className="form-control" defaultValue={formData.IDXe} disabled />
                                                    </div>
                                                    <div className="col">
                                                        <label className="form-label">Tình trạng</label>
                                                        {formData.TinhTrang == "Đang thuê" ?
                                                            <input className="form-control" defaultValue={formData.TinhTrang} disabled /> :
                                                            <div>
                                                                <Form.Select name="TinhTrang" defaultValue={formData.TinhTrang} onChange={Input}>
                                                                    <option value="Còn trống">Còn trống</option>
                                                                    <option value="Tạm ngừng">Tạm ngừng</option>
                                                                </Form.Select>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>

                                                {/*Tên Xe*/}
                                                <div className="form-group">
                                                    <div className="col">
                                                        <label className="form-label">Tên xe</label>
                                                        <input className="form-control" type="text" autoComplete="off" name="TenXe" defaultValue={formData.TenXe} onChange={Input} />
                                                    </div>
                                                </div>

                                                {/*Biển số xe & Số chỗ ngồi*/}
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
                                                            <option value={4}>4 chỗ</option>
                                                            <option value={8}>8 chỗ</option>
                                                            <option value={16}>16 chỗ</option>
                                                            <option value={30}>30 chỗ</option>
                                                            <option value={45}>45 chỗ</option>
                                                        </Form.Select>
                                                    </div>
                                                </div>

                                                {/*Nhiên liệu & Số tiền*/}
                                                <div className="form-group row mt-1">

                                                    {/*Nhiên liệu*/}
                                                    <div className="col">
                                                        <label className="form-label">Nhiên liệu</label>
                                                        <Form.Select name="NhienLieu" defaultValue={formData.NhienLieu} onChange={Input}>
                                                            <option value={"Xăng dầu"}>Xăng dầu</option>
                                                            <option value={"Điện"}>Điện</option>
                                                            <option value={"Xăng dầu + Điện"}>Xăng dầu + Điện</option>
                                                        </Form.Select>
                                                    </div>

                                                    {/*Truyền động*/}
                                                    <div className="col">
                                                        <label className="form-label">Truyền động</label>
                                                        <Form.Select name="TruyenDong" defaultValue={formData.TruyenDong} onChange={Input}>
                                                            <option value={"Số sàn"}>Số sàn</option>
                                                            <option value={"Số tự động"}>Số tự động</option>
                                                            <option value={"Số tự động kép"}>Số tự động kép</option>
                                                            <option value={"Số CVT"}>Số CVT</option>
                                                        </Form.Select>
                                                    </div>

                                                    {/*Số tiền*/}
                                                    <div className="col">
                                                        <label className="form-label">Số tiền/1 ngày</label>
                                                        {formData.TinhTrang != "Đang thuê" ? <input className="form-control" type="number" autoComplete="off" name="SoTien" defaultValue={formData.SoTien} onChange={Input} /> :
                                                            <input className="form-control" defaultValue={formData.SoTien} disabled />}

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
                                                    <label className="small mt-1" style={{ color: "grey" }}>Cho phép JPG và PNG</label>
                                                </div>

                                                {Progress >= 0 || Progress != undefined ? <ProgressBar now={Progress} label={`${Progress != 100 ? Progress + "%" : "Tải thành công"}`} /> : ""}

                                                {/*Mô tả*/}
                                                <div className="form-group mt-1">
                                                    <label className="form-label">Mô tả</label>
                                                    <textarea className="form-control" type="text" name="MoTa" defaultValue={formData.MoTa} onChange={Input} />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row-reverse mb-1 mr-1   ">
                                                {!inUploadProgress ?
                                                    <button type="submit" className="btn btn-success">Lưu chỉnh sửa</button> :
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