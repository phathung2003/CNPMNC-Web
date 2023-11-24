import EmployeeInfo from '../Get/employeeDetail'

export default async function fetchCar(IDParams, setFormData, setFile, setTemp) {
    const data = await EmployeeInfo(IDParams);
    if (data) {
        console.log(data)
        setFormData({
            _idNV: data.IDNV._id,
            _idTK: data._id,
    
            IDNV: data.IDNV.IDNV,
            tempChucVu: data.ChucVu,
            ChucVu: data.ChucVu,
            TenNV: data.IDNV.TenNV,
            NgaySinh: data.IDNV.NgaySinh,
            DiaChi: data.IDNV.DiaChi,
            SoDienThoai: data.IDNV.SoDienThoai,
            CMND: data.IDNV.CMND,
            SoLuong: 0,
    
            TenTaiKhoan: data.TenTaiKhoan,
            MatKhau: data.MatKhau,
            Avatar: data.Avatar,
            IDKH: null,
        })
        setFile(data.Avatar)
        setTemp(data.Avatar)
    }
};