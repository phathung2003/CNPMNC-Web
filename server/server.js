const check = require("./checkConnection");
const contactModel = require("./models/Contact");
const [result, port, app] = check(true);

const XeModel = require("./models/Xe");
const KhachHangModel = require("./models/KhachHang");
const SoXeModel = require("./models/SoXe");

const mongoose = require("mongoose");
const params = require('params');
const ObjectId = mongoose.Types.ObjectId;

const carModel = require("./models/Car");
const staffModel = require("./models/Staff")

if(result){
    app.post('/contact', (req,res) => {``
        
        const {name, email, password} = req.body;
        contactModel.findOne({email : email}).then(
            user => {
                if(user){
                        res.json("Tài khoản đã tồn tại")
                }
                else{
                    contactModel.create(req.body)
                    .then(info => res.json(info))
                    .catch(err => res.json(err))
                }
            }
        )
    })
    

    app.post("/main", (req,res) => {
        const {email, password} = req.body;
        contactModel.findOne({email : email}).then(
            user => {
                if(user){
                    if(user.password === password){
                        res.json("Ok")
                    }else{
                        res.json("Sai mật khẩu")                      
                    }
                }
                else{
                    res.json("Không có tài khoản")
                }
            }
        )
    })

    app.get("/info", async (req,res) => {
        contactModel.find()
        .then(info => res.json(info))
        .catch(err => res.json(err))
    })
    
    //--------- Xử lý quản lý xe ---------///
    
    app.post('/CarAdd/', async (req,res) => {
        await XeModel.create(req.body)
        .then(() => res.json({success: true, msg: 'Thêm xe thành công'}))
        .catch(() => res.json({ success: false, msg: 'Thêm xe thất bại. Vui lòng thử lại sau !' }))
    })


    app.post('/CarDelete/:ID', async (req, res) => {
        await SoXeModel.deleteMany({IDXe : `${req.params.ID}`})
        await XeModel.deleteOne({ _id : `${req.params.ID}`})

        .then(() => res.json({ success: true, msg: 'Xoá xe thành công' }))
        .catch(() => res.json({ success: false, msg: 'Xoá xe thất bại. Vui lòng thử lại sau !' }))
    });

    
    app.post('/CarEdit/:ID', async (req, res) => {
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

    app.get("/CarMain", async (req,res) => {
        await XeModel.find().then(info => res.json(info)).catch(err => res.json(err))
    })

    app.get("/CarDetail/:IDXe", async (req,res) => {
        const info = await XeModel.findOne({_id : `${req.params.IDXe}`}).populate("IDDon")
        res.json(info)
    })
    //--------- Xử lý quản lý sổ đặt xe ---------///
    app.get('/BookDetail/:IDXe', async (req,res) => {
        const info = await SoXeModel.find({ IDXe : `${req.params.IDXe}`})
        res.json(info)
        // .catch(err => res.json(err))
    })

    app.post('/BookAdd/:IDXe/', async (req,res) => {
        try{
            await SoXeModel.create(req.body)
            .then((e) => res.json({success: true, msg: e._id}))
        }
        catch{() => {res.json({ success: false, msg: 'Tạo đơn đặt trước xe thất bại. Vui lòng thử lại sau !' })}}
    })

    app.post('/BookCancel/:IDDon', async (req,res) => {
        await SoXeModel.updateOne({ _id : `${req.params.IDDon}`},{
            $set: {TinhTrang : "Huỷ đơn"}
        })
        .then(() => res.json({ success: true, msg: 'Huỷ đơn đặt trước thành công !' }))
        .catch(() => res.json({ success: false, msg: 'Huỷ đơn đặt trước thất bại. Vui lòng thử lại sau !' }))
    })

    app.post('/BookCreateRent/:IDXe/:IDDon', async (req,res) => {
        const {TinhTrang, KhachTra} = req.body;

        await SoXeModel.updateOne({ _id : `${req.params.IDDon}`},{
            $set: {
              KhachTra : KhachTra,
              TinhTrang : TinhTrang
            }
        })
        .then(() => res.json({ success: true, msg: 'Tạo đơn thành công !' }))
        .catch(() => res.json({ success: false, msg: 'Tạo đơn thất bại. Vui lòng thử lại sau !' }))
    })

    //--------- Xử lý quản lý sổ xe ---------///
    app.post('/CustomerAdd/', async (req,res) => {
        await KhachHangModel.create(req.body)
        .then((KhachHangInfo) => res.json({success: true, msg: `${KhachHangInfo._id}`}))
        .catch(() => res.json({ success: false, msg: 'Thêm khách hàng thất bại. Vui lòng thử lại sau !' }))
    })

    app.post('/CustomerEdit/:ID', async (req,res) => {
        const {TenKH, NgaySinh, DiaChi, SoDienThoai, CMND, HinhCMND, BangLai, HinhBangLai} = req.body;

        await KhachHangModel.updateOne({ _id : `${req.params.ID}`},{
            $set: {
                TenKH: TenKH, 
                NgaySinh : NgaySinh, 
                DiaChi : DiaChi, 
                SoDienThoai : SoDienThoai, 
                CMND : CMND, 
                HinhCMND : HinhCMND, 
                BangLai : BangLai, 
                HinhBangLai : HinhBangLai
            }
        })
        .then(() => res.json({ success: true, msg:`${req.params.ID}` }))
        .catch(() => res.json({ success: false, msg: 'Cập nhật thất bại. Vui lòng thử lại sau !' }))

    })

    app.get('/CustomerMain/', async (req,res) => {
        await KhachHangModel.find()
        .then(info => res.json(info))
        .catch(err => res.json(err))
    })

    app.post('/RentAdd/:IDXe/', async (req,res) => {
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

    app.post('/RentEdit/:IDXe/:IDDon', async (req,res) => {
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


    app.post('/RentCheckout/:IDXe/:IDDon', async (req,res) => {
        
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


    app.get('/RentDetail/:IDDon/', async (req,res) => {
        try{
            const info = await SoXeModel.findOne({_id : `${req.params.IDDon}`}).populate("IDXe").populate("IDKH")
            res.json(info)
        }
        catch(e){res.json(e)}
       
        // .catch(err => res.json(err))
    })


    //--------- Xử lý quản lý nhân viên ---------///    

     
    app.post('/staffAdd', async (req,res) => {
        try{
        staffModel.create(req.body)
        .then(info => res.json(info))
        .catch(err => res.json(err));
          
        }
        catch(err)
        {
            console.error(err);
        }
    })


    app.post('/staffDelete', async (req, res) => {
        try{
            const {id} = req.body;
            await staffModel.deleteOne({ _id : `${id}`});
            return res.json({ success: true, msg: 'Xoá nhân viên thành công' });
        }
        catch(err){console.error(err);}
    });

    app.post('/staffEdit', async (req, res) => {
        try{
            const {IDNV, Avatar, TenNV, NgaySinh, DiaChi, SoDienThoai, CMND, HinhCMND} = req.body;
            await staffModel.updateOne({ _id : `${IDNV}`},{
                $set: {                 
                    Avatar: Avatar,
                    TenNV: TenNV,
                    NgaySinh: NgaySinh,
                    DiaChi: DiaChi,
                    SoDienThoai: SoDienThoai,
                    CMND: CMND,
                    HinhCMND: HinhCMND,
                }
            });
            return res.json({ success: true, msg: 'Cập nhật thành công !' });
        }
        catch(err){
            console.error(err);
        }
    });

    app.get("/staffMain",(req,res) => {
        staffModel.find()
        .then(info => res.json(info))
        .catch(err => res.json(err))
    })

    try{app.listen(port, () =>{console.log("Server khởi động tại port " + port)})}
    catch{console.log("Server khởi động thất bại")}
}



