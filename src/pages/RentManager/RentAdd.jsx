import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from 'date-fns';
import ProgressBar from 'react-bootstrap/ProgressBar';

import "../../css/Detail.css"
import "../../css/pictureUpload.css"

import handleSubmit from "../../backend/RentManager/View/rentAdd";
import convertToBase64 from "../../backend/Feature/convertToBase64"
import fetchData from "../../backend/RentManager/fetchCar";

const defaultPicture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/default_picture.jpg?alt=media"

//---------------------------------------------//
export default function RentAdd() {
    const params = useParams();
    const navigate = useNavigate();

    const IDParams = params.id;

    const [data, setData] = useState(null)
    const [formData, setFormData] = useState({ loading: false })

    const [CMNDImage, setCMNDImage] = useState("Default");
    const [tempCMND, setTempCMND] = useState(defaultPicture);
    const [CMNDProgress, setCMNDProgress] = useState();

    const [licenseImage, setLicenseImage] = useState("Default");
    const [tempLicense, setTempLicense] = useState(defaultPicture);
    const [licenseProgress, setLicenseProgress] = useState();

    const [inUploadProgress, setInUploadProgress] = useState(false);
    const [numberOfDay, setNumberOfDay] = useState(1);

    //Transfer from API
    useEffect(() => { fetchData(IDParams, setData, setFormData, navigate) }, [])

    useEffect(() => {
        if (formData.NgayBatDau != "" && formData.NgayKetThuc != "" && data != null) {
            // To set two dates to two variables 
            const Start = new Date(formData.NgayBatDau).getTime()
            const End = new Date(formData.NgayKetThuc).getTime()

            // To calculate the time difference of two dates 
            const Difference_In_Time = End - Start;

            // To calculate the no. of days between two dates 
            const day = Difference_In_Time / (1000 * 3600 * 24) + 1;
            setNumberOfDay(day);
        }
        else setNumberOfDay(1);
    }, [formData.NgayBatDau, formData.NgayKetThuc])


    function Input(event) {setFormData({ ...formData, [event.target.name]: event.target.value })}

    const onFileChange = (event) => {
        switch (event.target.name) {
            case "CMND":
                setCMNDImage(event.target.files[0]);
                convertToBase64(event, setTempCMND)
                break;
            default:
                setLicenseImage(event.target.files[0]);
                convertToBase64(event, setTempLicense)
        }
    };

    if (!formData.loading) return;
    else {
        return (
            <div>
                <div className="container light-style flex-grow-1 container-p-y">

                    <div className="d-flex justify-content-between">
                        <button className="btn btn-primary mb-0" onClick={(e) => navigate("/Rent")}>Quay lại</button>
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
                                        <img src={`${data.HinhAnh}`} className="carPicture" />
                                    </div>

                                    {/*Tên xe*/}
                                    <h2 className="mt-1">{data.TenXe}</h2>

                                    {/*ID Xe & Tình trạng*/}
                                    <div className="form-group row mt-1">
                                        <p className="col"><strong>ID Xe: </strong> {data.IDXe}</p>
                                        <p className="col"><strong>Tình trạng: </strong> {data.TinhTrang}</p>
                                    </div>

                                    {/*Biển số & Trạng thái*/}
                                    <div className="form-group row mt-1">
                                        <p className="col"><strong>Biển số: </strong> {data.BienSo}</p>
                                        <p className="col"><strong>Số chỗ: </strong> {data.SoCho}</p>
                                    </div>

                                    {/*Truyền động & Nhiên liệu*/}
                                    <div className="form-group row mt-1">
                                        <p className="col"><strong>Truyền động: </strong> {data.TruyenDong}</p>
                                        <p className="col"><strong>Nhiên liệu: </strong> {data.NhienLieu}</p>
                                    </div>

                                    <p><strong>Mô tả</strong></p>
                                    <p>{data.MoTa}</p>
                                </div>
                            </div>

                            <div className="col-md-7">
                                <div className="tab-content">

                                    {/*Thông tin người thuê*/}
                                    <div className="tab-pane fade active show">
                                        <h3 className="mt-1 ml-2">Thông tin người thuê</h3>

                                        <form onSubmit={(e) => handleSubmit(e, formData, CMNDImage, licenseImage, setCMNDProgress, setLicenseProgress, inUploadProgress, setInUploadProgress, navigate, data.SoTien * numberOfDay * 0.5)}>
                                            < div className="card-body">

                                                <div className="form-group row mt-0">
                                                    <div className="col">
                                                        <label className="form-label">Họ và tên</label>
                                                        <input className="form-control" type="text" autoComplete="off" name="TenKH" onChange={Input} />
                                                    </div>

                                                    <div className="col">
                                                        <label className="form-label">Ngày sinh</label>
                                                        <input className="form-control" type="date" autoComplete="off" name="NgaySinh" onChange={Input} />
                                                    </div>
                                                </div>

                                                <div className="form-group row mt-2">
                                                    <div className="col">
                                                        <label className="form-label">Địa chỉ</label>
                                                        <input className="form-control" type="text" autoComplete="off" name="DiaChi" onChange={Input} />
                                                    </div>

                                                    <div className="col">
                                                        <label className="form-label">Số điện thoại</label>
                                                        <input className="form-control" type="text" autoComplete="off" name="SoDienThoai" onChange={Input} />
                                                    </div>
                                                </div>

                                                {/*Biển số xe & Truyền động & Số chỗ ngồi*/}
                                                {/*Upload hình*/}
                                                <div className="form-group row mt-2">


                                                    <div className="col">
                                                        <div className="form-group col">
                                                            <div className="col">
                                                                <label className="form-label">CMND/CCCD</label>
                                                                <input className="form-control" type="text" autoComplete="off" name="CMND" onChange={Input} />
                                                            </div>

                                                            <div className="img-area mt-2">
                                                                <img src={`${tempCMND}`} className="carPicture" />
                                                                <h3>Hình CMND</h3>
                                                            </div>

                                                            {CMNDProgress >= 0 || CMNDProgress != undefined ? <ProgressBar className="mt-3" now={CMNDProgress} label={`${CMNDProgress != 100 ? CMNDProgress + "%" : "Tải thành công"}`} /> :
                                                                <label className="select-image btn btn-outline-primary mt-1">
                                                                    Tải hình CMND/CCCD
                                                                    <input type="file" className="account-settings-fileinput" name="CMND" onChange={onFileChange} />
                                                                </label>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="col">
                                                        <div className="form-group col">
                                                            <div className="col">
                                                                <label className="form-label">Giấy phép lái xe</label>
                                                                <input className="form-control" type="text" autoComplete="off" name="BangLai" onChange={Input} />
                                                            </div>

                                                            <div className="img-area mt-2">
                                                                <img src={`${tempLicense}`} className="carPicture" />
                                                                <h3>Hình CMND</h3>
                                                            </div>

                                                            {licenseProgress >= 0 || licenseProgress != undefined ? <ProgressBar className="mt-3" now={licenseProgress} label={`${licenseProgress != 100 ? licenseProgress + "%" : "Tải thành công"}`} /> :
                                                                <label className="select-image btn btn-outline-primary mt-1 p-2">
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
                                                        <input className="form-control" type="date" autoComplete="off" value={formData.NgayBatDau} name="NgayBatDau" onChange={Input} />
                                                    </div>

                                                    <div className="col">
                                                        <label className="form-label">Ngày kết thúc</label>
                                                        <input className="form-control" type="date" autoComplete="off" value={formData.NgayKetThuc} name="NgayKetThuc" onChange={Input} />
                                                    </div>
                                                </div>

                                                <label className="form-label mt-2">Hoá đơn</label>

                                                <div className="form-group row mt-0">
                                                    <hr></hr>
                                                    <p className="col">Đơn giá 1 ngày</p>
                                                    <p className="col">{data.SoTien.toLocaleString('vi-VN')} đ/ngày</p>
                                                    <hr></hr>
                                                    <p className="col">Tổng phí thuê xe</p>
                                                    <p className="col">{data.SoTien.toLocaleString('vi-VN')} đ x {numberOfDay} ngày</p>
                                                    <hr></hr>
                                                    <h5 className="col font-bold">Tổng cộng</h5>
                                                    <p className="col font-bold">{(data.SoTien * numberOfDay).toLocaleString('vi-VN')} đ</p>
                                                    <hr></hr>
                                                    <p className="col">{"Phí cọc (50%)"}</p>
                                                    <p className="col">{(data.SoTien * numberOfDay * 0.5).toLocaleString('vi-VN')} đ</p>
                                                    <p></p>

                                                    <div className="row">
                                                        <p className="col">Khách trả</p>

                                                        <div className="flex align-middle col">
                                                            <input className="flex form-control" style={{ width: "95%" }} type="number" min={0} autoComplete="off" name="TraTruoc" defaultValue={0} onChange={Input} /> <span className="mx-2"> đ</span>
                                                        </div>
                                                    </div>
                                                    <hr className="mt-2"></hr>


                                                    <div>
                                                        {data.SoTien * numberOfDay - formData.TraTruoc >= 0 ?
                                                            <div className="row">
                                                                <p className="col">Còn lại</p>
                                                                <p className="col">{(data.SoTien * numberOfDay - formData.TraTruoc).toLocaleString('vi-VN')} đ</p>
                                                            </div> :
                                                            <div className="row">
                                                                <p className="col">Tiền thừa</p>
                                                                <p className="col">{Math.abs(data.SoTien * numberOfDay - formData.TraTruoc).toLocaleString('vi-VN')} đ</p>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="form-group">
                                                {!inUploadProgress ?
                                                    <button type="submit" className="btn btn-success row mb-2" style={{ width: "100%" }}>Tạo đơn</button> :
                                                    <button type="submit" className="btn btn-secondary row mb-2" style={{ width: "100%" }}>Đang xử lý dữ liệu</button>
                                                }
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

}