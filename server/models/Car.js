const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({
    ID : String,
    BienSo :  String,
    SoCho : String,
    TruyenDong : String,
    NhienLieu : String,
    NhienLieuTieuHao : String,
    MoTa : String,
    SoTien : String,
    HinhAnh : String,
    TinhTrang : String,
})

//const <Tên model> = mongoose.model("<Tên bảng",<Dữ liệu)
const carModel  = mongoose.model("Car",carSchema)
module.exports = carModel