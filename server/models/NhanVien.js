const mongoose = require("mongoose")

const NhanVienSchema = new mongoose.Schema({
    IDNV: String,
    TenNV: String,
    Avatar: String,
    NgaySinh: Date,
    DiaChi: String,
    SoDienThoai: String,
    CMND: String,
    HinhCMND: String,
})

//const <Tên model> = mongoose.model("<Tên bảng",<Dữ liệu)
const NhanVienModel  = mongoose.model("NhanVien",NhanVienSchema)
module.exports = NhanVienModel
