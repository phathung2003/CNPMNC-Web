require('dotenv').config()
const ObjectIdCaiDat = process.env.OBJECT_ID;

const express = require('express');
const router = express.Router();

const TaiKhoanModel = require('../models/TaiKhoan');
const XeModel = require("../models/Xe");
const CaiDatModel = require("../models/CaiDat")

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const LichSuModel = require("../models/LichSu")

router.get('/AccountMain', async (req,res) => {
    try{
        const info = await TaiKhoanModel.find({ ChucVu: { $in: ["Giám đốc", "Kế toán"] } }).populate("IDNV")
        res.json(info)
    }
    catch(e){res.json(e)}
})

router.post('/AccountAdd/:IDXe/', async (req,res) => {
    try{
        await TaiKhoanModel.create(req.body).then(() => res.json({success: true, msg: "Tạo đơn thành công"}))
    }
    catch{() => {res.json({ success: false, msg: 'Thêm xe thất bại. Vui lòng thử lại sau !' })}}
})

router.post('/RentEdit/:IDXe/:IDDon/:SoLuong', async (req,res) => {
    try{
        const {NgayKetThuc,TinhTrang} = req.body;

        await TaiKhoanModel.updateOne({ _id : `${req.params.IDDon}`},{
            $set: {
              NgayKetThuc : NgayKetThuc,
              TinhTrang : TinhTrang
            }
        })
        .then(() => res.json({ success: true, msg: 'Cập nhật thành công !' }))

        //Ghi lịch sử
        const log = {
            Ngay: new Date(Date.now()).getTime(),
            MaDon: `${req.body.IDDon}`,
            DanhMuc: "Sổ xe",
            MoTa: "Chỉnh sửa thông tin thành công",
            ThongTin: req.body.KhachTra,
        }
        
        await LichSuModel.create(log);
    }
    catch{() => res.json({ success: false, msg: 'Cập nhật thất bại. Vui lòng thử lại sau !' })}

   
})

router.post('/RentCheckout/:IDXe/:IDDon/:TienTra', async (req,res) => {
    try{
        await TaiKhoanModel.updateOne({ _id : `${req.params.IDDon}`},{
            $set: {
                KhachTra : `${req.body.KhachTra}`,
                TinhTrang : "Hoàn thành",
            }
        })
    
        await XeModel.updateOne({ _id : `${req.params.IDXe}`},{
            $set: {TinhTrang : "Còn trống", IDDon : null}
        })
    
        //Ghi lịch sử
        const log = {
            Ngay: new Date(Date.now()).getTime(),
            MaDon: `${req.body.IDDon}`,
            DanhMuc: "Sổ xe",
            MoTa: "Thanh toán thành công",
            ThongTin: req.params.TienTra,
        }
        await LichSuModel.create(log);

        res.json({ success: true, msg: 'Trả xe thành công !' })
    }
    catch{() => res.json({ success: false, msg: 'Trả xe thất bại. Vui lòng thử lại sau !' })}
})

router.get('/RentDetail/:IDDon/', async (req,res) => {
    try{
        const info = await TaiKhoanModel.findOne({_id : `${req.params.IDDon}`}).populate("IDXe").populate("IDKH")
        res.json(info)
    }
    catch(e){res.json(e)}
   
    // .catch(err => res.json(err))
})

module.exports = router;