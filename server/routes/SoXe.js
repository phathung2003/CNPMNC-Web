const express = require('express');
const router = express.Router();

const SoXeModel = require('../models/SoXe');
const XeModel = require("../models/Xe");
const KhachHangModel = require("../models/KhachHang");

const mongoose = require("mongoose");
const params = require('params');
const ObjectId = mongoose.Types.ObjectId;

router.get('/RentMain', async (req,res) => {
    try{
        const info = await SoXeModel.find().populate("IDXe").populate("IDKH")
        res.json(info)
    }
    catch(e){res.json(e)}
})

router.post('/RentAdd/:IDXe/', async (req,res) => {
    req.body.IDXe = new ObjectId(`${req.params.IDXe}`);
    req.body.IDKH = new ObjectId(`${req.body.IDKH}`);
    try{
        await SoXeModel.create(req.body)
        .then((SoXeInfo) => {
                XeModel.updateOne({ _id : `${req.params.IDXe}`},{
                    $set: {
                        TinhTrang : "Đang thuê",
                        IDDon: new ObjectId(`${SoXeInfo._id}`),
                    }
                })
                .then(() => res.json({success: true, msg: "Tạo đơn thành công"}))
        }) 
    }
    catch{() => {res.json({ success: false, msg: 'Thêm xe thất bại. Vui lòng thử lại sau !' })}}
})

router.post('/RentEdit/:IDXe/:IDDon', async (req,res) => {
    const {NgayKetThuc,TinhTrang} = req.body;

    await SoXeModel.updateOne({ _id : `${req.params.IDDon}`},{
        $set: {
          NgayKetThuc : NgayKetThuc,
          TinhTrang : TinhTrang
        }
    })
    .then(() => res.json({ success: true, msg: 'Cập nhật thành công !' }))
    .catch(() => res.json({ success: false, msg: 'Cập nhật thất bại. Vui lòng thử lại sau !' }))
})

router.post('/RentCheckout/:IDXe/:IDDon', async (req,res) => {
    
    await SoXeModel.updateOne({ _id : `${req.params.IDDon}`},{
        $set: {
            KhachTra : `${req.body.KhachTra}`,
            TinhTrang : "Hoàn thành",
            
        }
    })

    await XeModel.updateOne({ _id : `${req.params.IDXe}`},{
        $set: {TinhTrang : "Còn trống", IDDon : null}
    })
    .then(() => res.json({ success: true, msg: 'Trả xe thành công !' }))
    .catch(() => res.json({ success: false, msg: 'Trả xe thất bại. Vui lòng thử lại sau !' }))
})

router.get('/RentDetail/:IDDon/', async (req,res) => {
    try{
        const info = await SoXeModel.findOne({_id : `${req.params.IDDon}`}).populate("IDXe").populate("IDKH")
        res.json(info)
    }
    catch(e){res.json(e)}
   
    // .catch(err => res.json(err))
})

module.exports = router;