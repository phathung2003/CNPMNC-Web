const mongoose = require("mongoose")

const caidatSchema = new mongoose.Schema({
    Xe4: Number,
    Xe8: Number,
    Xe16: Number,
    Xe30: Number,
    Xe45: Number,
    SLDon: Number,
    SLKhachHang: Number,
    SLNhanVien: Number,
})

const caidatModel = mongoose.model("CaiDat",caidatSchema)
module.exports = caidatModel
