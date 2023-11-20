import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from 'date-fns';
import ProgressBar from 'react-bootstrap/ProgressBar';

import "../../css/Detail.css"
import "../../css/pictureUpload.css"

import handleSubmit from "../../backend/BookManager/View/BookAdd";
import convertToBase64 from "../../backend/Feature/convertToBase64"

import fetchData from "../../backend/BookManager/Fetch/fetchData"
import fetchRentData from "../../backend/BookManager/Fetch/fetchRent"

import customerData from "../../backend/RentManager/Get/getCustomer"

import SearchData from "../../backend/RentManager/searchCustomer"

const defaultPicture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/default_picture.jpg?alt=media"

//---------------------------------------------//
export default function RentAdd() {
    const params = useParams();
    const navigate = useNavigate();

    const IDParams = params.id;

    const [data, setData] = useState(null)
    const [rentData, setRentData] = useState(false)
    const [formData, setFormData] = useState({ loading: false })

    const [CMNDImage, setCMNDImage] = useState("Default");
    const [tempCMND, setTempCMND] = useState(defaultPicture);
    const [CMNDProgress, setCMNDProgress] = useState();

    const [licenseImage, setLicenseImage] = useState("Default");
    const [tempLicense, setTempLicense] = useState(defaultPicture);
    const [licenseProgress, setLicenseProgress] = useState();

    const [inUploadProgress, setInUploadProgress] = useState(false);

    const [search, setSearch] = useState("");
    const [onSearch, setOnSearch] = useState(true);
    const [numberOfDay, setNumberOfDay] = useState(1);

    var customerList = SearchData(customerData(), search);
    var rentList = fetchRentData("", rentData, formData.NgayBatDau, formData.NgayKetThuc);
    //Transfer from API
    useEffect(() => { fetchData(IDParams, setData, setFormData, setRentData) }, [])

    useEffect(() => {
        if (formData.NgayBatDau != "" && formData.NgayKetThuc != "" && data != null) {
            var startDate = new Date(formData.NgayBatDau).getTime();
            var endDate = new Date(formData.NgayKetThuc).getTime();
            if (startDate < Date.now()) {
                setFormData({ ...formData, ["NgayBatDau"]: `${format(Date.now(), "yyyy-MM-dd")}` })
            }
            if (startDate > endDate) {
                setFormData({ ...formData, ["NgayKetThuc"]: formData.NgayBatDau })
            }

            // To calculate the time difference of two dates 
            const Difference_In_Time = endDate - startDate;

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

    function setCustomer(data) {
        if (formData.loading) {
            setFormData({
                ...formData,
                ["_idKH"]: data._id,
                ["IDKH"]: data.IDKH,
                ["TenKH"]: data.TenKH,
                ["NgaySinh"]: `${data.NgaySinh != null ? format(data.NgaySinh, "yyyy-MM-dd") : ""}`,
                ["DiaChi"]: data.DiaChi,
                ["SoDienThoai"]: data.SoDienThoai,
                ["CMND"]: data.CMND,
                ["HinhCMND"]: data.HinhCMND,
                ["BangLai"]: data.BangLai,
                ["HinhBangLai"]: data.HinhBangLai,
                ["searchOn"]: false,
            })
            setSearch(data.IDKH)
            setCMNDImage(data.HinhCMND);
            setTempCMND(data.HinhCMND)
            setLicenseImage(data.HinhBangLai)
            setTempLicense(data.HinhBangLai)
        }
    }

    function setSearchValue(event) {
        setSearch(event.target.value)

        if (formData._idKH != "") {
            setFormData({
                ...formData,
                ["_idKH"]: "",
                ["IDKH"]: "",
                ["TenKH"]: "",
                ["NgaySinh"]: "",
                ["DiaChi"]: "",
                ["SoDienThoai"]: "",
                ["CMND"]: "",
                ["HinhCMND"]: defaultPicture,
                ["BangLai"]: "",
                ["HinhBangLai"]: defaultPicture,
                ["searchOn"]: true,
            })
            setCMNDImage("Default");
            setTempCMND(defaultPicture)
            setLicenseImage("Default")
            setTempLicense(defaultPicture)
        }
    }

    useEffect(() => { setOnSearch(formData.searchOn) }, [formData, search])


    if (!formData.loading) return;
    else {
        return (
            <div>
                <div className="container light-style flex-grow-1 container-p-y">

                    <div className="d-flex justify-content-between">
                        <button className="btn btn-primary mb-0" onClick={(e) => window.history.back()}>Quay lại</button>
                        <h3> Đơn đặt trước xe </h3>
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

                                        <form onSubmit={(e) => handleSubmit(e, formData, CMNDImage, licenseImage, setCMNDProgress, setLicenseProgress, inUploadProgress, setInUploadProgress, navigate, rentList.length)}>
                                            < div className="card-body">

                                                <div className="form-group col mt-0 ">
                                                    <label className="form-label col">ID Khách hàng</label>
                                                    <input className="form-control col" type="text" autoComplete="off" placeholder="Họ tên, Số điện thoại, CMND hoặc ID của khách hàng" value={search} onChange={(event) => setSearchValue(event)} />
                                                </div>

                                                <div>
                                                    {onSearch == true ?
                                                        <div>
                                                            {search == "" ? <div /> :
                                                                <div>

                                                                    <div className="mt-1 w-250 w-250 text-white text-lg " style={{ background: "#48494B" }}>
                                                                        <div className="row">
                                                                            <div className="ml-1 col">Tên khách hàng</div>
                                                                            <div className="col">Số điện thoại</div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="mt-1 w-250 max-h-[150px] overflow-y-auto overflow-x-clip" style={{ background: "FBF4E2" }}>

                                                                        {
                                                                            customerList.map(info => {
                                                                                return (
                                                                                    <div>
                                                                                        <div key={info._id} className="block hover:bg-gray-200 no-underline text-black" onClick={(e) => setCustomer(info)}>
                                                                                            <div className="row text-lg">
                                                                                                <div className="ml-1 col">{info.TenKH}</div>
                                                                                                <div className="col">{info.SoDienThoai}</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                    <hr></hr>
                                                                </div>
                                                            }
                                                        </div>
                                                        : <div />}
                                                </div>

                                                <div className="form-group row mt-2">
                                                    <div className="col">
                                                        <label className="form-label">Họ và tên</label>
                                                        <input className="form-control" type="text" autoComplete="off" value={formData.TenKH} name="TenKH" onChange={Input} />
                                                    </div>

                                                    <div className="col">
                                                        <label className="form-label">Ngày sinh</label>
                                                        <input className="form-control" type="date" autoComplete="off" value={formData.NgaySinh} name="NgaySinh" onChange={Input} />
                                                    </div>
                                                </div>

                                                <div className="form-group row mt-2">
                                                    <div className="col">
                                                        <label className="form-label">Địa chỉ</label>
                                                        <input className="form-control" type="text" autoComplete="off" value={formData.DiaChi} name="DiaChi" onChange={Input} />
                                                    </div>

                                                    <div className="col">
                                                        <label className="form-label">Số điện thoại</label>
                                                        <input className="form-control" type="text" autoComplete="off" value={formData.SoDienThoai} name="SoDienThoai" onChange={Input} />
                                                    </div>
                                                </div>

                                                {/*Biển số xe & Truyền động & Số chỗ ngồi*/}
                                                {/*Upload hình*/}
                                                <div className="form-group row mt-2">
                                                    <div className="col">
                                                        <div className="form-group col">
                                                            <div className="col">
                                                                <label className="form-label">CMND/CCCD</label>
                                                                <input className="form-control" type="text" autoComplete="off" value={formData.CMND} name="CMND" onChange={Input} />
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
                                                                <input className="form-control" type="text" autoComplete="off" value={formData.BangLai} name="BangLai" onChange={Input} />
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


                                                <hr></hr>
                                                <h3 className="mt-3">Thông tin thuê</h3>
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
                                                {
                                                    rentList.filter(s => { return s.TinhTrang == "Hoạt động" }).length > 0 && rentList.filter(s => { return s.TinhTrang != "Hoạt động" }).length > 0 ?
                                                        <p className="text-red-400 mt-2 mb-0">* Xe này hiện đang được chạy và được đặt trước trong quãng thời gian này!</p> :
                                                        rentList.filter(s => { return s.TinhTrang == "Hoạt động" }).length > 0 ?
                                                            <p className="text-red-400 mt-2 mb-0">* Xe này hiện đang được chạy trong quãng thời gian này !</p> :
                                                            rentList.filter(s => { return s.TinhTrang != "Hoạt động" }).length > 0 ?
                                                                <p className="text-red-400 mt-2 mb-0">* Xe này hiện đang có người đặt trước trong quãng thời gian này !</p> : <></>
                                                }
                                                {
                                                    rentList.filter(s => { return s.TinhTrang == "Hoạt động" }).length > 0 ?
                                                        <div>
                                                            <label className="form-label mt-3">Đơn đang đặt</label>
                                                            <div id="table-scroll" className="table-scroll" style={{ maxHeight: "30vw" }}>
                                                                <table id="main-table" className="main-table" style={{ width: "100%" }}>
                                                                    <thead>
                                                                        <tr style={{ textAlign: "center" }}>
                                                                            <th>Mã đơn</th>
                                                                            <th>Ngày bắt đầu</th>
                                                                            <th>Ngày kết thúc</th>
                                                                            <th></th>
                                                                        </tr>
                                                                    </thead>

                                                                    <tbody>
                                                                        {
                                                                            rentList != null && rentList != 0 ? rentList.filter(s => { return s.TinhTrang == "Hoạt động" }).map((info) => {
                                                                                return <tr key={info._id}>
                                                                                    <td align="center" style={{ width: "10vw" }}>{info.IDDon}</td>
                                                                                    <td style={{ textAlign: "center", width: "15vw" }}>{`${format(info.NgayBatDau, "dd/MM/yyyy")}`}</td>
                                                                                    <td style={{ textAlign: "center", width: "15vw" }}>{`${format(info.NgayKetThuc, "dd/MM/yyyy")}`}</td>
                                                                                    <td className="align-middle" style={{ width: "8vw" }}>
                                                                                        {
                                                                                            <button className="btn btn-primary" onClick={(e) => { navigate(`/Rent/Detail/${info._id}`), { state: `{/BookAdd/${IDParams}}` } }}>Chi tiết</button>
                                                                                        }

                                                                                    </td>
                                                                                </tr>
                                                                            }) : <tr><td colSpan={6} height={100} className='text-center text-2xl font-bold bg-transparent'>Hiện tại chưa có đơn đặt trước nào !</td></tr>
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div >
                                                        </div> : <div />
                                                }

                                                {
                                                    rentList.filter(s => { return s.TinhTrang != "Hoạt động" }).length > 0 ?
                                                        <div>
                                                            <label className="form-label mt-3">Đơn đặt trước đó</label>
                                                            <div id="table-scroll" className="table-scroll" style={{ maxHeight: "30vw" }}>
                                                                <table id="main-table" className="main-table" style={{ width: "100%" }}>
                                                                    <thead>
                                                                        <tr style={{ textAlign: "center" }}>
                                                                            <th>Mã đơn</th>
                                                                            <th>Ngày bắt đầu</th>
                                                                            <th>Ngày kết thúc</th>
                                                                            <th></th>
                                                                        </tr>
                                                                    </thead>

                                                                    <tbody>
                                                                        {
                                                                            rentList != null && rentList != 0 ? rentList.filter(s => { return s.TinhTrang != "Hoạt động" }).map((info) => {
                                                                                return <tr key={info._id}>
                                                                                    <td align="center" style={{ width: "10vw" }}>{info.IDDon}</td>
                                                                                    <td style={{ textAlign: "center", width: "15vw" }}>{`${format(info.NgayBatDau, "dd/MM/yyyy")}`}</td>
                                                                                    <td style={{ textAlign: "center", width: "15vw" }}>{`${format(info.NgayKetThuc, "dd/MM/yyyy")}`}</td>
                                                                                    <td className="align-middle" style={{ width: "8vw" }}>
                                                                                        {
                                                                                            <button className="btn btn-primary" onClick={(e) => navigate(`/Book/Detail/${formData._idXe}/${info._id}`)}>Chi tiết</button>
                                                                                        }

                                                                                    </td>
                                                                                </tr>
                                                                            }) : <tr><td colSpan={6} height={100} className='text-center text-2xl font-bold bg-transparent'>Hiện tại chưa có đơn đặt trước nào !</td></tr>
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div >
                                                        </div> : <div />
                                                }

                                                <label className="form-label mt-4">Hoá đơn</label>
                                                <div className="form-group row mt-0">
                                                    <hr></hr>
                                                    <p className="col">Đơn giá 1 ngày</p>
                                                    <p className="col">{data.SoTien.toLocaleString('vi-VN')} đ/ngày</p>
                                                    <hr></hr>
                                                    <p className="col">Tổng phí thuê xe</p>
                                                    <p className="col">{data.SoTien.toLocaleString('vi-VN')} đ x {numberOfDay} ngày</p>
                                                    <hr></hr>
                                                    <h5 className="col font-bold">Tổng cộng</h5>
                                                    <p className="col font-bold">{(data.SoTien * numberOfDay).toLocaleString('vi-VN')}đ</p>
                                                    <hr></hr>
                                                    <p className="col">Tiền cọc trước</p>
                                                    <p className="col">{(data.SoTien * numberOfDay * 0.5).toLocaleString('vi-VN')} đ</p>

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