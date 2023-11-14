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
    app.use('/Car', XeRoute)

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

    //--------- Xử lý quản lý nhân viên ---------///    

     
    app.post('/staffAdd', async (req,res) => {
        staffModel.create(req.body)
        .then(info => res.json(info))
        .catch(err => res.json(err))
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
            await staffModel.updateOne({ _id : `${ID}`},{
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

    try{app.listen(port, () =>{console.log("Server khởi động tại port " + port)})}
    catch{console.log("Server khởi động thất bại")}
}