const express = require('express');
const router = express.Router();

const SoXeModel = require('../models/SoXe');
const XeModel = require("../models/Xe");
const KhachHangModel = require("../models/KhachHang");

const mongoose = require("mongoose");
const params = require('params');
const ObjectId = mongoose.Types.ObjectId;

router.post('/CarAdd/', async (req,res) => {
    await XeModel.create(req.body)
    .then(() => res.json({success: true, msg: 'Thêm xe thành công'}))
    .catch(() => res.json({ success: false, msg: 'Thêm xe thất bại. Vui lòng thử lại sau !' }))
})


router.post('/CarDelete/:ID', async (req, res) => {
    await SoXeModel.deleteMany({IDXe : `${req.params.ID}`})
    await XeModel.deleteOne({ _id : `${req.params.ID}`})

    .then(() => res.json({ success: true, msg: 'Xoá xe thành công' }))
    .catch(() => res.json({ success: false, msg: 'Xoá xe thất bại. Vui lòng thử lại sau !' }))
});


router.post('/CarEdit/:ID', async (req, res) => {
    const {TenXe, BienSo, SoCho, TruyenDong, NhienLieu, MoTa, SoTien, HinhAnh, TinhTrang} = req.body;
    await XeModel.updateOne({ _id : `${req.params.ID}`},{
        $set: {
            TenXe : TenXe,
            BienSo :  BienSo,
            SoCho : SoCho,
            TruyenDong : TruyenDong,
            NhienLieu : NhienLieu,
            MoTa : MoTa,
            SoTien : SoTien,
            HinhAnh : HinhAnh,
            TinhTrang : TinhTrang,
        }
    })
    .then(() => res.json({ success: true, msg: 'Cập nhật thành công !' }))
    .catch(() => res.json({ success: false, msg: 'Cập nhật thất bại. Vui lòng thử lại sau !' }))
});

router.get("/CarMain", async (req,res) => {
    await XeModel.find().then(info => res.json(info)).catch(err => res.json(err))
})

router.get("/CarDetail/:IDXe", async (req,res) => {
    const info = await XeModel.findOne({_id : `${req.params.IDXe}`}).populate("IDDon")
    res.json(info)
})

module.exports = router;