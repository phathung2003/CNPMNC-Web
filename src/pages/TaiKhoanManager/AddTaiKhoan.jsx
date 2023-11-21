import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import convertToBase64 from "../../backend/Feature/convertToBase64"
import handleSubmit from "../../backend/TaiKhoanManager/taikhoanAdd";

const defaultPicture = "https://firebasestorage.googleapis.com/v0/b/thuexe-5b600.appspot.com/o/default_user.jpg?alt=media";

export default function AddStaff() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [imageNV, setNVImage] = useState(location.state.Avatar);
    const [tempNV, setNVTemp] = useState(location.state.Avatar);
    const [ProgressNV, setNVProgress] = useState();
    
   
    

    const [formData, setFormData] = useState({
        IDNV: location.state?._id || "",
        Avatar: location.state?.Avatar || defaultPicture,
        TenTaiKhoan: "",
        MatKhau: "123456",
        ChucVu: "",
        TinhTrang: "",
        
    });

    const Input = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

        
    const onFileChange = (event) => {     
        setNVImage(event.target.files[0]);
        convertToBase64(event, setNVTemp)
    }
    


    return (
        <div>
            <div className="container light-style flex-grow-1 container-p-y">
                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary mb-0" onClick={() => navigate("/TaiKhoan")}>Quay lại</button>
                    <h4 className="font-weight-bold"> Thêm tài khoản </h4>
                </div>
                <div className="card overflow-hidden mt-1 d-flex">
                    <div className="row no-gutters row-bordered row-border-light">
                        <div className="col-md-3">
                            <div className="list-group list-group-flush account-settings-links">
                            <div className="justify-content-center form-group col mt-5 ml-5">
                                    <img src={`${tempNV}`} className="avatar" />
                                    
                            </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="tab-content">
                                <div className="tab-pane fade active show">
                                    <form onSubmit={(e) => handleSubmit(e, formData, imageNV, setNVProgress)}>
                                        <div className="card-body">
                                            <div className="form-group row mt-1">
                                                <div className="col">
                                                    <label className="form-label">ID</label>
                                                    <input className="form-control" type="text" disabled value={formData.IDNV} />
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">Tên Tài khoản</label>
                                                    <input className="form-control" type="text" autoComplete="off" name="TenTaiKhoan" onChange={Input} />
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">Mật khẩu</label>
                                                    <input className="form-control" type="password" value={formData.MatKhau} autoComplete="off" name="MatKhau" onChange={Input} />
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">Chức vụ</label>
                                                    <Form.Select name="ChucVu" defaultValue={'Khách hàng'} onChange={Input}>
                                                        <option value={'Khách hàng'}>Khách hàng</option>
                                                        <option value={'Nhân viên'}>Nhân viên</option>
                                                        <option value={'Chủ'}>Chủ</option>
                                                    </Form.Select>
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">Tình trạng</label>
                                                    <Form.Select name="TinhTrang" defaultValue={'Còn làm'} onChange={Input}>
                                                        <option value={'Còn làm'}>Còn làm</option>
                                                        <option value={'Nghỉ làm'}>Nghỉ làm</option>
                                                    </Form.Select>
                                                    
                                                </div>
                                            </div>
                                            
                                            {/*Upload hình*/}
                                            <div className="form-group row mt-2">

                                                <label className="col-3"> Hình ảnh nhân viên </label>
                                                <label className="btn btn-outline-primary col-3">
                                                    Tải hình mới
                                                    <input type="file" className="account-settings-fileinput" name="NV" onChange={onFileChange} />
                                                </label> &nbsp;
                                                <button type="button" className="btn btn-outline-secondary col-3" onClick={(e) => {
                                                    setNVImage("Default")
                                                    
                                                    setNVTemp(defaultPicture)
                                                }}>Mặc định</button>
                                                <label className="small mt-1" style={{ color: "grey" }}>Cho phép JPG, GIF và PNG</label>
                                                {ProgressNV >= 0 || ProgressNV != undefined ? <ProgressBar className="mt-3" now={ProgressNV} label={`${ProgressNV != 100 ? ProgressNV + "%" : "Tải thành công"}`} /> : ""}
                                            </div>

                                        </div>
                                        <div className="d-flex flex-row-reverse mb-1 mr-1">
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
