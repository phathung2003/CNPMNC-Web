const check = require("./checkConnection");
const contactModel = require("./models/Contact");
const [result, port, app] = check(true);

const XeRoute = require('./routes/Xe')
const SoDatXeRoute = require('./routes/SoDatXe');
const SoXeRoute = require('./routes/SoXe')
const KhachHangRoute = require('./routes/KhachHang');
const CaiDatRoute = require('./routes/CaiDat');
const LichSuRoute = require("./routes/LichSu")

const carModel = require("./models/Car");
const staffModel = require("./models/Staff")

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
        console.log(req.body)
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

    app.get("/info",(req,res) => {
        contactModel.find()
        .then(info => res.json(info))
        .catch(err => res.json(err))
    })
    
    //--------- Xử lý quản lý xe ---------///
    app.use('/Car', XeRoute)

<<<<<<< HEAD
=======

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
    
>>>>>>> b8361492a883e468b416780bf40e1744cc9758fc
    //--------- Xử lý quản lý sổ đặt xe ---------///
    app.use('/Book', SoDatXeRoute);

    //--------- Xử lý quản lý sổ xe (Khách hàng) ---------//
    app.use('/Customer', KhachHangRoute);
    
    //--------- Xử lý quản lý sổ xe (Sổ xe) ---------//
    app.use('/Rent', SoXeRoute)

    //--------- Xử lý cài đặt ---------//
    app.use('/Setting', CaiDatRoute)

    //--------- Xử lý Lịch sử ---------//
    app.use('/History', LichSuRoute)

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
                    IDNV: IDNV,
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

<<<<<<< HEAD
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
=======

    app.post('/carDelete', async (req, res) => {
        try{
            const {id} = req.body;
            await carModel.deleteOne({ _id : `${id}`});
            return res.json({ success: true, msg: 'Xoá xe thành công' });
        }
        catch(err){console.error(err);}
    });

    app.post('/carEdit', async (req, res) => {
        try{
            const {ID, TenXe, BienSo, SoCho, TruyenDong, NhienLieu, MoTa, SoTien, HinhAnh, TinhTrang} = req.body;
            await carModel.updateOne({ _id : `${ID}`},{
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
            });
            return res.json({ success: true, msg: 'Cập nhật thành công !' });
        }
>>>>>>> b8361492a883e468b416780bf40e1744cc9758fc
        catch(err){
            console.error(err);
        }
    });

<<<<<<< HEAD
    app.get("/staffMain",(req,res) => {
        staffModel.find()
=======
    app.get("/carMain",(req,res) => {
        carModel.find()
>>>>>>> b8361492a883e468b416780bf40e1744cc9758fc
        .then(info => res.json(info))
        .catch(err => res.json(err))
    })

    //--------- Xử lý quản lý nhân viên ---------///    

     
    app.post('/staffAdd', async (req,res) => {
        try{
        staffModel.create(req.body)
        .then(info => res.json(info))
<<<<<<< HEAD
        .catch(err => res.json(err));
          
=======
        .catch(err => res.json(err));         
>>>>>>> b8361492a883e468b416780bf40e1744cc9758fc
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
<<<<<<< HEAD
=======

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
                    IDNV: IDNV,
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
>>>>>>> b8361492a883e468b416780bf40e1744cc9758fc

    try{app.listen(port, () =>{console.log("Server khởi động tại port " + port)})}
    catch{console.log("Server khởi động thất bại")}
}