const express = require('express');
const router = express.Router();

const SoXeModel = require('../models/SoXe');
const XeModel = require("../models/Xe");
const KhachHangModel = require("../models/KhachHang");

const mongoose = require("mongoose");
const params = require('params');
const ObjectId = mongoose.Types.ObjectId;

router.get('/BookDetail/:IDXe/:IDDon', async (req,res) => {
    const info = await SoXeModel.find({ 
        IDXe : `${req.params.IDXe}`,
        _id : { $nin: [req.params.IDDon] }
    }).populate("IDXe").populate("IDKH")
    res.json(info)
    // .catch(err => res.json(err))
})

router.get('/BookDetail/:IDXe/', async (req,res) => {
    const info = await SoXeModel.find({ IDXe : `${req.params.IDXe}`,}).populate("IDXe").populate("IDKH")
    res.json(info)
    // .catch(err => res.json(err))
})

router.post('/BookAdd/:IDXe/', async (req,res) => {
    try{
        await SoXeModel.create(req.body)
        .then((e) => res.json({success: true, msg: e._id}))
    }
    catch{() => {res.json({ success: false, msg: 'Tạo đơn đặt trước xe thất bại. Vui lòng thử lại sau !' })}}
})

router.post('/BookEdit/:IDXe/:IDDon', async (req,res) => {
    const {NgayBatDau, NgayKetThuc,TinhTrang} = req.body;

    await SoXeModel.updateOne({ _id : `${req.params.IDDon}`},{
        $set: {
          NgayBatDau : NgayBatDau,
          NgayKetThuc : NgayKetThuc,
          TinhTrang : TinhTrang
        }
    })
    .then(() => res.json({ success: true, msg: 'Cập nhật thành công !' }))
    .catch(() => res.json({ success: false, msg: 'Cập nhật thất bại. Vui lòng thử lại sau !' }))
})

router.post('/BookCancel/:IDDon', async (req,res) => {
    await SoXeModel.updateOne({ _id : `${req.params.IDDon}`},{
        $set: {TinhTrang : "Huỷ đơn"}
    })
    .then(() => res.json({ success: true, msg: 'Huỷ đơn đặt trước thành công !' }))
    .catch(() => res.json({ success: false, msg: 'Huỷ đơn đặt trước thất bại. Vui lòng thử lại sau !' }))
})

router.post('/BookCreateRent/:IDXe/:IDDon', async (req,res) => {
    const {TinhTrang, KhachTra} = req.body;

    try{
        await SoXeModel.updateOne({ _id : `${req.params.IDDon}`},{
            $set: {
              KhachTra : KhachTra,
              TinhTrang : TinhTrang
            }
        })    
        .then(async() => {await XeModel.updateOne({ _id : `${req.params.IDXe}`},{
                $set: {
                    TinhTrang : "Đang thuê",
                    IDDon: new ObjectId(`${req.params.IDDon}`),
                }
            })
            .then(() => res.json({success: true, msg: "Tạo đơn thành công"}))
    }) 
    }
    catch{() => res.json({ success: false, msg: 'Tạo đơn thất bại. Vui lòng thử lại sau !' })}
})

module.exports = router;