import { useParams } from "react-router-dom"


import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from 'date-fns';

import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';

import "../../css/Detail.css"
import "../../css/pictureUpload.css"

import RentInfo from "../../backend/RentManager/getInfo"
import handleSubmit from "../../backend/RentManager/View/rentAdd";
import convertToBase64 from "../../backend/Feature/convertToBase64"

const defaultPicture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/default_picture.jpg?alt=media"

//---------------------------------------------//
export default function testing() {
    const params = useParams();
    const navigate = useNavigate();

    const IDParams = params.id;
    const [data, setData] = useState(null)
    const [formData, setFormData] = useState({ loading: false })

    const [CMNDImage, setCMNDImage] = useState(defaultPicture);
    const [tempCMND, setTempCMND] = useState(defaultPicture);
    const [CMNDProgress, setCMNDProgress] = useState();

    const [licenseImage, setLicenseImage] = useState(defaultPicture);
    const [tempLicense, setTempLicense] = useState(defaultPicture);
    const [licenseProgress, setLicenseProgress] = useState();

    const [inUploadProgress, setInUploadProgress] = useState(false);
    const [numberOfDay, setNumberOfDay] = useState("");

    //Transfer from API
    useEffect(() => {
        const fetchData = async () => {
            const data = await RentInfo(IDParams);
            if (data) {
                setData(data)
                setFormData({
                    //Thông tin Khách Hàng
                    _idKH: data.IDKH._id,
                    IDKH: data.IDKH.IDKH,
                    TenKH: data.IDKH.TenKH,
                    NgaySinh: `${format(data.IDKH.NgaySinh, "yyyy-MM-dd")}`,
                    DiaChi: data.IDKH.DiaChi,
                    SoDienThoai: data.IDKH.SoDienThoai,
                    CMND: data.IDKH.CMND,
                    HinhCMND: data.IDKH.HinhCMND,
                    BangLai: data.IDKH.BangLai,
                    HinhBangLai: data.IDKH.HinhBangLai,

                    //Thông tin xe
                    _idXe: data.IDXe._id,

                    //Thông tin đơn thuê
                    _idDon: data._id,
                    IDDon: data.IDDon,
                    NgayBatDau: `${format(data.NgayBatDau, "yyyy-MM-dd")}`,
                    NgayKetThuc: `${format(data.NgayKetThuc, "yyyy-MM-dd")}`,
                    TinhTrang: data.TinhTrang,

                    loading: true,
                })
                setCMNDImage(`${data.IDKH.HinhCMND}`)
                setTempCMND(`${data.IDKH.HinhCMND}`)
                setLicenseImage(`${data.IDKH.HinhBangLai}`)
                setTempLicense(`${data.IDKH.HinhBangLai}`)
            }
        };
        fetchData();


    }, [])

    useEffect(() => {
        if (formData.NgayBatDau != "" && formData.NgayKetThuc != "") {
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

    function Input(event) { setFormData({ ...formData, [event.target.name]: event.target.value }) }

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
                        <h3 className="flex align-middle"><span className="text-lg mt-1"><span className="font-bold">Mã đơn: </span> {data.IDXe.IDXe} - </span><span className="ml-1 mr-1">Chi tiết đơn</span></h3>
                    </div>

                    {/*Thanh Sidebar*/}
                    <div className="card overflow-hidden mt-1 d-flex">
                        <div className="row no-gutters row-bordered row-border-light">
                            <div className="col-md-5">

                                <div className="list-group list-group-flush account-settings-links  ml-5 ">

                                    <h3 className="mt-1">Thông tin xe</h3>

                                    {/*Hình Avatar*/}
                                    <div className="justify-content-center form-group col">
                                        <img src={`${data.IDXe.HinhAnh}`} className="carPicture" />
                                    </div>

                                    {/*Tên xe*/}
                                    <h2 className="mt-1">{data.IDXe.TenXe}</h2>

                                    {/*ID Xe & Tình trạng*/}
                                    <div className="form-group row mt-1">
                                        <p className="col"><strong>ID Xe: </strong> {data.IDXe.IDXe}</p>
                                        <p className="col"><strong>Tình trạng: </strong> {data.IDXe.TinhTrang}</p>
                                    </div>

                                    {/*Biển số & Trạng thái*/}
                                    <div className="form-group row mt-1">
                                        <p className="col"><strong>Biển số: </strong> {data.IDXe.BienSo}</p>
                                        <p className="col"><strong>Số chỗ: </strong> {data.IDXe.SoCho}</p>
                                    </div>

                                    {/*Truyền động & Nhiên liệu*/}
                                    <div className="form-group row mt-1">
                                        <p className="col"><strong>Truyền động: </strong> {data.IDXe.TruyenDong}</p>
                                        <p className="col"><strong>Nhiên liệu: </strong> {data.IDXe.NhienLieu}</p>
                                    </div>

                                    <p><strong>Mô tả</strong></p>
                                    <p>{data.IDXe.MoTa}</p>
                                </div>
                            </div>


                            <div className="col-md-7">
                                <div className="tab-content">

                                    {/*Thông tin người thuê*/}
                                    <div className="tab-pane fade active show">

                                        <div className="d-flex justify-content-between mt-1 mb-0 align-middle">
                                            <h3 className="ml-2">Thông tin người thuê</h3>
                                            <p className="mt-2 mr-2"><strong>Mã khách hàng: </strong> {`${(formData.IDKH).trim()}`}</p>
                                        </div>


                                        <form onSubmit={(e) => handleSubmit(e, formData, CMNDImage, licenseImage, setCMNDProgress, setLicenseProgress, inUploadProgress, setInUploadProgress, navigate)}>
                                            < div className="card-body mt-0">


                                                <div className="form-group row mt-0">
                                                    <div className="col">
                                                        <label className="form-label">Họ và tên</label>
                                                        <input className="form-control" type="text" autoComplete="off" name="TenKH" defaultValue={`${formData.TenKH}`} onChange={Input} />
                                                    </div>

                                                    <div className="col">
                                                        <label className="form-label">Ngày sinh</label>
                                                        <input className="form-control" type="date" autoComplete="off" name="NgaySinh" defaultValue={`${formData.NgaySinh}`} onChange={Input} />
                                                    </div>
                                                </div>

                                                <div className="form-group row mt-2">
                                                    <div className="col">
                                                        <label className="form-label">Địa chỉ</label>
                                                        <input className="form-control" type="text" autoComplete="off" name="DiaChi" defaultValue={`${formData.DiaChi}`} onChange={Input} />
                                                    </div>

                                                    <div className="col">
                                                        <label className="form-label">Số điện thoại</label>
                                                        <input className="form-control" type="text" autoComplete="off" name="SoDienThoai" defaultValue={`${formData.SoDienThoai}`} onChange={Input} />
                                                    </div>
                                                </div>

                                                {/*Biển số xe & Truyền động & Số chỗ ngồi*/}
                                                {/*Upload hình*/}
                                                <div className="form-group row mt-2">


                                                    <div className="col">
                                                        <div className="form-group col">
                                                            <div className="col">
                                                                <label className="form-label">CMND/CCCD</label>
                                                                <input className="form-control" type="text" autoComplete="off" name="CMND" defaultValue={`${formData.CMND}`} onChange={Input} />
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
                                                                <input className="form-control" type="text" autoComplete="off" name="BangLai" defaultValue={`${formData.BangLai}`} onChange={Input} />
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
                                                        <input className="form-control" type="date" autoComplete="off" defaultValue={formData.NgayBatDau} name="NgayBatDau" onChange={Input} />
                                                    </div>

                                                    <div className="col">
                                                        <label className="form-label">Ngày kết thúc</label>
                                                        <input className="form-control" type="date" autoComplete="off" defaultValue={formData.NgayKetThuc} name="NgayKetThuc" onChange={Input} />
                                                    </div>
                                                </div>

                                                <label className="form-label mt-2">Hoá đơn</label>

                                                <div className="form-group row mt-0">
                                                    <hr></hr>
                                                    <p className="col">Đơn giá 1 ngày</p>
                                                    <p className="col">{data.IDXe.SoTien.toLocaleString('vi-VN')} đ/ngày</p>
                                                    <hr></hr>
                                                    <p className="col">Tổng phí thuê xe</p>
                                                    <p className="col">{data.IDXe.SoTien.toLocaleString('vi-VN')} đ x {numberOfDay} ngày</p>
                                                    <hr></hr>
                                                    <h5 className="col font-bold">Tổng cộng</h5>
                                                    <p className="col font-bold">{(data.IDXe.SoTien * numberOfDay).toLocaleString('vi-VN')}đ</p>
                                                </div>

                                            </div>
                                            <div className="form-group">
                                                {!inUploadProgress ?
                                                    <button type="submit" className="btn btn-success row mb-2" style={{ width: "100%" }}>Lưu</button> :
                                                    <button type="submit" className="btn btn-success row mb-2" style={{ width: "100%" }}>Đang lưu dữ liệu</button>
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